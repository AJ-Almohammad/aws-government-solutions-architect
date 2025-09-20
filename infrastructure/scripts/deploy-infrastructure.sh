#!/bin/bash

# AWS Government Solutions Architecture - Infrastructure Deployment Script
# Author: Amer Almohammad
# Purpose: Deploy complete infrastructure stack with zero-cost strategy

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="gov-solutions"
ENVIRONMENT="demo"
REGION="eu-central-1"
TEMPLATES_DIR="../cloudformation"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
S3_BUCKET="${PROJECT_NAME}-${ENVIRONMENT}-cfn-templates-${ACCOUNT_ID}"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    # Check region
    CURRENT_REGION=$(aws configure get region)
    if [ "$CURRENT_REGION" != "$REGION" ]; then
        print_warning "Current AWS region is $CURRENT_REGION, script expects $REGION"
        read -p "Continue with current region? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
        REGION=$CURRENT_REGION
    fi
    
    # Verify account
    print_status "AWS Account: $ACCOUNT_ID"
    print_status "AWS Region: $REGION"
    
    # Check CloudFormation templates exist
    for template in vpc-foundation.yaml security-groups.yaml compute-infrastructure.yaml master-stack.yaml; do
        if [ ! -f "$TEMPLATES_DIR/$template" ]; then
            print_error "Template not found: $TEMPLATES_DIR/$template"
            exit 1
        fi
    done
    
    print_success "Prerequisites check passed"
}

# Function to check for existing EC2 Key Pairs
check_key_pairs() {
    print_status "Checking for existing EC2 Key Pairs..."
    
    KEY_PAIRS=$(aws ec2 describe-key-pairs --query 'KeyPairs[].KeyName' --output text 2>/dev/null || echo "")
    
    if [ -z "$KEY_PAIRS" ]; then
        print_error "No EC2 Key Pairs found in region $REGION"
        print_status "You need to create an EC2 Key Pair first:"
        print_status "1. Go to AWS Console > EC2 > Key Pairs"
        print_status "2. Create a new key pair"
        print_status "3. Download the .pem file and store it securely"
        print_status "4. Re-run this script"
        exit 1
    fi
    
    print_success "Available Key Pairs: $KEY_PAIRS"
    echo
    echo "Please select a Key Pair for EC2 instance access:"
    select KEYPAIR in $KEY_PAIRS; do
        if [ -n "$KEYPAIR" ]; then
            print_success "Selected Key Pair: $KEYPAIR"
            break
        else
            print_error "Invalid selection. Please try again."
        fi
    done
}

# Function to create S3 bucket for CloudFormation templates
create_s3_bucket() {
    print_status "Setting up S3 bucket for CloudFormation templates..."
    
    # Check if bucket already exists
    if aws s3api head-bucket --bucket "$S3_BUCKET" 2>/dev/null; then
        print_success "S3 bucket $S3_BUCKET already exists"
        return
    fi
    
    # Create bucket
    if [ "$REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket "$S3_BUCKET"
    else
        aws s3api create-bucket --bucket "$S3_BUCKET" --create-bucket-configuration LocationConstraint="$REGION"
    fi
    
    # Enable versioning
    aws s3api put-bucket-versioning --bucket "$S3_BUCKET" --versioning-configuration Status=Enabled
    
    # Block public access
    aws s3api put-public-access-block --bucket "$S3_BUCKET" --public-access-block-configuration \
        BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
    
    print_success "S3 bucket $S3_BUCKET created and configured"
}

# Function to upload CloudFormation templates to S3
upload_templates() {
    print_status "Uploading CloudFormation templates to S3..."
    
    for template in vpc-foundation.yaml security-groups.yaml compute-infrastructure.yaml; do
        print_status "Uploading $template..."
        aws s3 cp "$TEMPLATES_DIR/$template" "s3://$S3_BUCKET/$template"
    done
    
    print_success "All templates uploaded to S3"
}

# Function to validate CloudFormation templates
validate_templates() {
    print_status "Validating CloudFormation templates..."
    
    for template in vpc-foundation.yaml security-groups.yaml compute-infrastructure.yaml master-stack.yaml; do
        print_status "Validating $template..."
        aws cloudformation validate-template --template-body "file://$TEMPLATES_DIR/$template" > /dev/null
        print_success "$template is valid"
    done
}

# Function to deploy the infrastructure stack
deploy_stack() {
    print_status "Deploying infrastructure stack..."
    
    STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-master"
    
    # Check if stack already exists
    if aws cloudformation describe-stacks --stack-name "$STACK_NAME" &>/dev/null; then
        print_warning "Stack $STACK_NAME already exists"
        read -p "Do you want to update it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            ACTION="update-stack"
        else
            print_status "Deployment cancelled"
            return
        fi
    else
        ACTION="create-stack"
    fi
    
    # Prepare parameters (removed database parameters)
    PARAMETERS="ParameterKey=ProjectName,ParameterValue=$PROJECT_NAME"
    PARAMETERS="$PARAMETERS ParameterKey=Environment,ParameterValue=$ENVIRONMENT"
    PARAMETERS="$PARAMETERS ParameterKey=KeyPairName,ParameterValue=$KEYPAIR"
    
    # Deploy stack
    print_status "Starting CloudFormation deployment..."
    STACK_ID=$(aws cloudformation $ACTION \
        --stack-name "$STACK_NAME" \
        --template-body "file://$TEMPLATES_DIR/master-stack.yaml" \
        --parameters $PARAMETERS \
        --capabilities CAPABILITY_NAMED_IAM \
        --tags Key=Project,Value="$PROJECT_NAME" Key=Environment,Value="$ENVIRONMENT" Key=DeployedBy,Value="$(whoami)" Key=DeploymentDate,Value="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
        --query 'StackId' \
        --output text)
    
    print_success "Stack deployment initiated: $STACK_ID"
    print_status "Stack Name: $STACK_NAME"
    
    # Wait for stack completion
    print_status "Waiting for stack deployment to complete..."
    print_status "This may take 10-15 minutes..."
    
    if aws cloudformation wait stack-${ACTION%-stack}-complete --stack-name "$STACK_NAME"; then
        print_success "Stack deployment completed successfully!"
        
        # Get stack outputs
        print_status "Retrieving stack outputs..."
        aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].Outputs' --output table
        
        # Get Application URL
        APP_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].Outputs[?OutputKey==`ApplicationURL`].OutputValue' --output text)
        if [ -n "$APP_URL" ]; then
            print_success "Application URL: $APP_URL"
        fi
        
        # Get Bastion IP
        BASTION_IP=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].Outputs[?OutputKey==`BastionHostIP`].OutputValue' --output text)
        if [ -n "$BASTION_IP" ]; then
            print_success "Bastion Host IP: $BASTION_IP"
        fi
        
    else
        print_error "Stack deployment failed!"
        
        # Get stack events for debugging
        print_status "Recent stack events:"
        aws cloudformation describe-stack-events --stack-name "$STACK_NAME" --max-items 10 --query 'StackEvents[].[Timestamp,ResourceStatus,ResourceType,LogicalResourceId,ResourceStatusReason]' --output table
        
        exit 1
    fi
}

# Function to show cost estimation
show_cost_estimation() {
    print_status "Cost Estimation (EU-Central-1):"
    echo
    echo "Monthly Estimated Costs:"
    echo "  • Web Servers (2 x t3.micro):     ~\$20"
    echo "  • App Servers (2 x t3.micro):     ~\$20"
    echo "  • Application Load Balancer:      ~\$18"
    echo "  • NAT Gateway:                    ~\$45"
    echo "  • Bastion Host:                   ~\$10"
    echo "  ----------------------------------------"
    echo "  • Total Estimated:                ~\$113/month"
    echo
    print_warning "Costs are estimates and may vary based on usage"
    print_warning "Database excluded - can be added as separate stack later"
    print_warning "For demo purposes, destroy stack after testing to avoid charges"
    echo
}

# Function to create cleanup script
create_cleanup_script() {
    print_status "Creating cleanup script..."
    
    cat > cleanup-infrastructure.sh << 'EOF'
#!/bin/bash

# AWS Government Solutions Architecture - Cleanup Script
# Purpose: Remove all infrastructure to avoid charges

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_NAME="gov-solutions"
ENVIRONMENT="demo"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
S3_BUCKET="${PROJECT_NAME}-${ENVIRONMENT}-cfn-templates-${ACCOUNT_ID}"
STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-master"

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_warning "This will DELETE ALL infrastructure resources!"
print_warning "This action cannot be undone!"
echo
read -p "Are you sure you want to proceed? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    print_status "Cleanup cancelled"
    exit 0
fi

print_status "Starting infrastructure cleanup..."

# Delete CloudFormation stack
if aws cloudformation describe-stacks --stack-name "$STACK_NAME" &>/dev/null; then
    print_status "Deleting CloudFormation stack: $STACK_NAME"
    aws cloudformation delete-stack --stack-name "$STACK_NAME"
    
    print_status "Waiting for stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME"
    print_success "CloudFormation stack deleted"
else
    print_warning "Stack $STACK_NAME not found"
fi

# Empty and delete S3 bucket
if aws s3api head-bucket --bucket "$S3_BUCKET" 2>/dev/null; then
    print_status "Emptying S3 bucket: $S3_BUCKET"
    aws s3 rm "s3://$S3_BUCKET" --recursive
    
    print_status "Deleting S3 bucket: $S3_BUCKET"
    aws s3api delete-bucket --bucket "$S3_BUCKET"
    print_success "S3 bucket deleted"
else
    print_warning "S3 bucket $S3_BUCKET not found"
fi

print_success "Infrastructure cleanup completed!"
print_success "All AWS resources have been removed"
print_status "You can now safely close your AWS account or continue development"

EOF
    
    chmod +x cleanup-infrastructure.sh
    print_success "Cleanup script created: cleanup-infrastructure.sh"
}

# Main deployment function
main() {
    echo "=================================================="
    echo "AWS Government Solutions Architecture Deployment"
    echo "=================================================="
    echo
    
    check_prerequisites
    check_key_pairs
    show_cost_estimation
    
    read -p "Proceed with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled"
        exit 0
    fi
    
    create_s3_bucket
    upload_templates
    validate_templates
    deploy_stack
    create_cleanup_script
    
    echo
    echo "=================================================="
    print_success "Deployment completed successfully!"
    echo "=================================================="
    echo
    print_status "Next steps:"
    echo "1. Test your application using the Application URL"
    echo "2. Take screenshots and record demo videos"
    echo "3. Create your Vercel portfolio"
    echo "4. Add database as separate stack later if needed"
    echo "5. Run './cleanup-infrastructure.sh' when done to avoid charges"
    echo
    print_warning "Remember: Run cleanup script to avoid ongoing AWS charges!"
}

# Run main function
main "$@"