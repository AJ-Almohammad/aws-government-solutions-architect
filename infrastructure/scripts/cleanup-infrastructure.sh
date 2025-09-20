#!/bin/bash
# AWS Government Solutions Architecture - Complete Cleanup Script
# Purpose: Remove ALL infrastructure resources to avoid charges

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
MAIN_STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-master"
DATABASE_STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-database"

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_warning "This will DELETE ALL infrastructure resources!"
print_warning "Including: Main Stack, Database Stack, and S3 Bucket"
print_warning "This action cannot be undone!"
echo
read -p "Are you sure you want to proceed? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    print_status "Cleanup cancelled"
    exit 0
fi

print_status "Starting complete infrastructure cleanup..."

# Delete Database Stack First (no dependencies)
if aws cloudformation describe-stacks --stack-name "$DATABASE_STACK_NAME" &>/dev/null; then
    print_status "Deleting database stack: $DATABASE_STACK_NAME"
    aws cloudformation delete-stack --stack-name "$DATABASE_STACK_NAME"
    print_status "Database stack deletion initiated..."
else
    print_warning "Database stack $DATABASE_STACK_NAME not found"
fi

# Delete Main CloudFormation Stack
if aws cloudformation describe-stacks --stack-name "$MAIN_STACK_NAME" &>/dev/null; then
    print_status "Deleting main infrastructure stack: $MAIN_STACK_NAME"
    aws cloudformation delete-stack --stack-name "$MAIN_STACK_NAME"
    print_status "Main stack deletion initiated..."
else
    print_warning "Main stack $MAIN_STACK_NAME not found"
fi

# Wait for database stack deletion if it existed
if aws cloudformation describe-stacks --stack-name "$DATABASE_STACK_NAME" &>/dev/null; then
    print_status "Waiting for database stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$DATABASE_STACK_NAME"
    print_success "Database stack deleted successfully"
fi

# Wait for main stack deletion if it existed
if aws cloudformation describe-stacks --stack-name "$MAIN_STACK_NAME" &>/dev/null; then
    print_status "Waiting for main stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$MAIN_STACK_NAME"
    print_success "Main infrastructure stack deleted successfully"
fi

# Handle S3 bucket with versioning
if aws s3api head-bucket --bucket "$S3_BUCKET" 2>/dev/null; then
    print_status "Emptying S3 bucket: $S3_BUCKET"
    
    # Delete all current objects
    aws s3 rm "s3://$S3_BUCKET" --recursive
    
    # Delete all object versions
    print_status "Deleting all object versions..."
    aws s3api list-object-versions --bucket "$S3_BUCKET" --output text --query 'Versions[].{Key:Key,VersionId:VersionId}' | while read key versionid; do
        if [ "$key" != "None" ] && [ "$versionid" != "None" ]; then
            aws s3api delete-object --bucket "$S3_BUCKET" --key "$key" --version-id "$versionid" 2>/dev/null || true
        fi
    done
    
    # Delete all delete markers
    print_status "Deleting delete markers..."
    aws s3api list-object-versions --bucket "$S3_BUCKET" --output text --query 'DeleteMarkers[].{Key:Key,VersionId:VersionId}' | while read key versionid; do
        if [ "$key" != "None" ] && [ "$versionid" != "None" ]; then
            aws s3api delete-object --bucket "$S3_BUCKET" --key "$key" --version-id "$versionid" 2>/dev/null || true
        fi
    done
    
    print_status "Deleting S3 bucket: $S3_BUCKET"
    aws s3api delete-bucket --bucket "$S3_BUCKET"
    print_success "S3 bucket deleted successfully"
else
    print_warning "S3 bucket $S3_BUCKET not found"
fi

# Verify cleanup completion
print_status "Verifying cleanup completion..."
REMAINING_STACKS=$(aws cloudformation describe-stacks --query "Stacks[?contains(StackName,'$PROJECT_NAME')].StackName" --output text 2>/dev/null || echo "")
if [ -z "$REMAINING_STACKS" ]; then
    print_success "No remaining CloudFormation stacks found"
else
    print_warning "Some stacks may still exist: $REMAINING_STACKS"
fi

echo
print_success "==================================================="
print_success "Complete infrastructure cleanup completed!"
print_success "==================================================="
print_success "All AWS resources have been removed:"
print_success "✓ Main infrastructure stack deleted"
print_success "✓ Database stack deleted" 
print_success "✓ S3 bucket and all versions removed"
print_success "✓ No ongoing AWS charges"
echo
print_status "Your portfolio project is preserved in GitHub"
print_status "You can redeploy anytime using deploy scripts"
print_status "You can now safely close your AWS account or continue development"#!/bin/bash
# AWS Government Solutions Architecture - Complete Cleanup Script
# Purpose: Remove ALL infrastructure resources to avoid charges

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
MAIN_STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-master"
DATABASE_STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-database"

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_warning "This will DELETE ALL infrastructure resources!"
print_warning "Including: Main Stack, Database Stack, and S3 Bucket"
print_warning "This action cannot be undone!"
echo
read -p "Are you sure you want to proceed? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    print_status "Cleanup cancelled"
    exit 0
fi

print_status "Starting complete infrastructure cleanup..."

# Delete Database Stack First (no dependencies)
if aws cloudformation describe-stacks --stack-name "$DATABASE_STACK_NAME" &>/dev/null; then
    print_status "Deleting database stack: $DATABASE_STACK_NAME"
    aws cloudformation delete-stack --stack-name "$DATABASE_STACK_NAME"
    print_status "Database stack deletion initiated..."
else
    print_warning "Database stack $DATABASE_STACK_NAME not found"
fi

# Delete Main CloudFormation Stack
if aws cloudformation describe-stacks --stack-name "$MAIN_STACK_NAME" &>/dev/null; then
    print_status "Deleting main infrastructure stack: $MAIN_STACK_NAME"
    aws cloudformation delete-stack --stack-name "$MAIN_STACK_NAME"
    print_status "Main stack deletion initiated..."
else
    print_warning "Main stack $MAIN_STACK_NAME not found"
fi

# Wait for database stack deletion if it existed
if aws cloudformation describe-stacks --stack-name "$DATABASE_STACK_NAME" &>/dev/null; then
    print_status "Waiting for database stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$DATABASE_STACK_NAME"
    print_success "Database stack deleted successfully"
fi

# Wait for main stack deletion if it existed
if aws cloudformation describe-stacks --stack-name "$MAIN_STACK_NAME" &>/dev/null; then
    print_status "Waiting for main stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$MAIN_STACK_NAME"
    print_success "Main infrastructure stack deleted successfully"
fi

# Handle S3 bucket with versioning
if aws s3api head-bucket --bucket "$S3_BUCKET" 2>/dev/null; then
    print_status "Emptying S3 bucket: $S3_BUCKET"
    
    # Delete all current objects
    aws s3 rm "s3://$S3_BUCKET" --recursive
    
    # Delete all object versions
    print_status "Deleting all object versions..."
    aws s3api list-object-versions --bucket "$S3_BUCKET" --output text --query 'Versions[].{Key:Key,VersionId:VersionId}' | while read key versionid; do
        if [ "$key" != "None" ] && [ "$versionid" != "None" ]; then
            aws s3api delete-object --bucket "$S3_BUCKET" --key "$key" --version-id "$versionid" 2>/dev/null || true
        fi
    done
    
    # Delete all delete markers
    print_status "Deleting delete markers..."
    aws s3api list-object-versions --bucket "$S3_BUCKET" --output text --query 'DeleteMarkers[].{Key:Key,VersionId:VersionId}' | while read key versionid; do
        if [ "$key" != "None" ] && [ "$versionid" != "None" ]; then
            aws s3api delete-object --bucket "$S3_BUCKET" --key "$key" --version-id "$versionid" 2>/dev/null || true
        fi
    done
    
    print_status "Deleting S3 bucket: $S3_BUCKET"
    aws s3api delete-bucket --bucket "$S3_BUCKET"
    print_success "S3 bucket deleted successfully"
else
    print_warning "S3 bucket $S3_BUCKET not found"
fi

# Verify cleanup completion
print_status "Verifying cleanup completion..."
REMAINING_STACKS=$(aws cloudformation describe-stacks --query "Stacks[?contains(StackName,'$PROJECT_NAME')].StackName" --output text 2>/dev/null || echo "")
if [ -z "$REMAINING_STACKS" ]; then
    print_success "No remaining CloudFormation stacks found"
else
    print_warning "Some stacks may still exist: $REMAINING_STACKS"
fi

echo
print_success "==================================================="
print_success "Complete infrastructure cleanup completed!"
print_success "==================================================="
print_success "All AWS resources have been removed:"
print_success "✓ Main infrastructure stack deleted"
print_success "✓ Database stack deleted" 
print_success "✓ S3 bucket and all versions removed"
print_success "✓ No ongoing AWS charges"
echo
print_status "Your portfolio project is preserved in GitHub"
print_status "You can redeploy anytime using deploy scripts"
print_status "You can now safely close your AWS account or continue development"