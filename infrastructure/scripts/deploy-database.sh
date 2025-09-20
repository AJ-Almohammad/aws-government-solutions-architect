#!/bin/bash

# Database Deployment Script
# Deploy database separately but linked to main infrastructure

set -e

PROJECT_NAME="gov-solutions"
ENVIRONMENT="demo"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
S3_BUCKET="${PROJECT_NAME}-${ENVIRONMENT}-cfn-templates-${ACCOUNT_ID}"

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_status "Deploying database stack..."

# Upload database template
print_status "Uploading database template to S3..."
aws s3 cp ../cloudformation/database-simple.yaml "s3://$S3_BUCKET/"

# Validate template
print_status "Validating database template..."
aws cloudformation validate-template --template-body "file://../cloudformation/database-simple.yaml" > /dev/null
print_success "Database template is valid"

# Deploy database stack
STACK_NAME="${PROJECT_NAME}-${ENVIRONMENT}-database"

print_status "Deploying database stack: $STACK_NAME"
print_status "This will take 5-10 minutes..."

aws cloudformation create-stack \
  --stack-name "$STACK_NAME" \
  --template-body "file://../cloudformation/database-simple.yaml" \
  --parameters ParameterKey=ProjectName,ParameterValue="$PROJECT_NAME" ParameterKey=Environment,ParameterValue="$ENVIRONMENT" \
  --tags Key=Project,Value="$PROJECT_NAME" Key=Environment,Value="$ENVIRONMENT"

# Wait for completion
if aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME"; then
    print_success "Database stack deployed successfully!"
    
    # Get database endpoint
    DB_ENDPOINT=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].Outputs[?OutputKey==`DatabaseEndpoint`].OutputValue' --output text)
    print_success "Database Endpoint: $DB_ENDPOINT"
    
    # Show connection info
    print_status "Database Connection Details:"
    echo "  Host: $DB_ENDPOINT"
    echo "  Port: 5432"
    echo "  Database: postgres"
    echo "  Username: dbadmin"
    echo "  Password: SecurePassword123!"
    echo "  Connection via Bastion Host IP: 35.158.8.185"
    
else
    print_error "Database deployment failed!"
    aws cloudformation describe-stack-events --stack-name "$STACK_NAME" --max-items 5
    exit 1
fi