// src/data/snippets/programming/cloud/aws/index.js

const aws = [
  {
    id: "cloud-aws-beg-001",
    title: "AWS CLI — Setup & Basics",
    difficulty: "beginner",
    description: "Configurar credenciales, perfiles y comandos básicos",
    code: `# Configure credentials
aws configure
# AWS Access Key ID:     AKIA...
# AWS Secret Access Key: ****
# Default region:        eu-west-1
# Default output format: json

# Multiple profiles
aws configure --profile production
aws configure --profile staging

# Use specific profile
export AWS_PROFILE=production
aws s3 ls --profile production

# Get current identity
aws sts get-caller-identity

# List regions
aws ec2 describe-regions --output table

# Set output format
aws ec2 describe-instances --output table
aws ec2 describe-instances --output json
aws ec2 describe-instances --output yaml

# Query with JMESPath
aws ec2 describe-instances \
    --query "Reservations[*].Instances[*].[InstanceId,State.Name]" \
    --output table`,
  },
  {
    id: "cloud-aws-beg-002",
    title: "AWS S3 — Storage",
    difficulty: "beginner",
    description: "Crear buckets, subir archivos y gestionar objetos en S3",
    code: `# List buckets
aws s3 ls
aws s3 ls s3://my-bucket/

# Create bucket
aws s3 mb s3://myapp-assets-prod \
    --region eu-west-1

# Upload files
aws s3 cp ./dist/app.js s3://myapp-assets-prod/
aws s3 cp ./photo.jpg   s3://myapp-assets-prod/images/

# Upload entire folder
aws s3 sync ./dist/ s3://myapp-assets-prod/ \
    --delete \
    --exclude "*.map"

# Download
aws s3 cp s3://myapp-assets-prod/app.js ./
aws s3 sync s3://myapp-assets-prod/ ./local-backup/

# List objects
aws s3 ls s3://myapp-assets-prod/ --recursive --human-readable

# Delete
aws s3 rm s3://myapp-assets-prod/old-file.js
aws s3 rm s3://myapp-assets-prod/ --recursive

# Make bucket public (static website)
aws s3 website s3://myapp-assets-prod/ \
    --index-document index.html \
    --error-document error.html`,
  },
  {
    id: "cloud-aws-int-001",
    title: "AWS EC2 — Instances",
    difficulty: "intermediate",
    description: "Crear, gestionar y conectarse a instancias EC2",
    code: `# List instances
aws ec2 describe-instances \
    --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress,Tags[?Key=='Name'].Value|[0]]" \
    --output table

# Start / Stop / Terminate
aws ec2 start-instances     --instance-ids i-0abc123def456
aws ec2 stop-instances      --instance-ids i-0abc123def456
aws ec2 terminate-instances --instance-ids i-0abc123def456

# Launch new instance
aws ec2 run-instances \
    --image-id "ami-0c02fb55956c7d316" \
    --instance-type "t3.small" \
    --key-name "my-keypair" \
    --security-group-ids "sg-0abc123" \
    --subnet-id "subnet-0abc123" \
    --count 1 \
    --tag-specifications \
        'ResourceType=instance,Tags=[{Key=Name,Value=web-server}]'

# Create key pair
aws ec2 create-key-pair \
    --key-name "my-keypair" \
    --query "KeyMaterial" \
    --output text > my-keypair.pem

chmod 400 my-keypair.pem
ssh -i my-keypair.pem ec2-user@<public-ip>

# Security groups
aws ec2 authorize-security-group-ingress \
    --group-id "sg-0abc123" \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0`,
  },
  {
    id: "cloud-aws-int-002",
    title: "AWS Lambda & API Gateway",
    difficulty: "intermediate",
    description: "Crear funciones Lambda y exponerlas con API Gateway",
    code: `# List Lambda functions
aws lambda list-functions --output table

# Create Lambda function (from zip)
zip function.zip index.js

aws lambda create-function \
    --function-name "myapp-api" \
    --runtime "nodejs20.x" \
    --role "arn:aws:iam::123456789:role/lambda-role" \
    --handler "index.handler" \
    --zip-file "fileb://function.zip" \
    --environment Variables="{NODE_ENV=production,DB_URL=$DB_URL}" \
    --timeout 30 \
    --memory-size 256

# Update function code
aws lambda update-function-code \
    --function-name "myapp-api" \
    --zip-file "fileb://function.zip"

# Invoke function
aws lambda invoke \
    --function-name "myapp-api" \
    --payload '{"path":"/users","method":"GET"}' \
    --cli-binary-format raw-in-base64-out \
    response.json

cat response.json

# View logs
aws logs get-log-events \
    --log-group-name "/aws/lambda/myapp-api" \
    --log-stream-name "latest"`,
  },
  {
    id: "cloud-aws-adv-001",
    title: "AWS — Bash Automation Script",
    difficulty: "advanced",
    description: "Script bash real de despliegue en AWS S3 + CloudFront",
    code: `#!/bin/bash
set -euo pipefail

# ── Deploy Frontend to S3 + CloudFront ─────────────────────────────────────
BUCKET="myapp-assets-prod"
DISTRIBUTION_ID="E1ABC123DEF456"
BUILD_DIR="./dist"
REGION="eu-west-1"

log()   { echo "[$(date '+%H:%M:%S')] $*"; }
error() { log "ERROR: $*"; exit 1; }

# Validate AWS credentials
aws sts get-caller-identity > /dev/null 2>&1 || \
    error "AWS credentials not configured"

# Build the app
log "Building application..."
npm run build
[ -d "$BUILD_DIR" ] || error "Build failed — dist/ not found"

# Sync to S3
log "Uploading to S3: s3://$BUCKET"
aws s3 sync "$BUILD_DIR/" "s3://$BUCKET/" \
    --region "$REGION" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "index.html"

# Upload index.html with no-cache
aws s3 cp "$BUILD_DIR/index.html" "s3://$BUCKET/index.html" \
    --region "$REGION" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "text/html"

# Invalidate CloudFront cache
log "Invalidating CloudFront distribution: $DISTRIBUTION_ID"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text)

log "Invalidation created: $INVALIDATION_ID"

# Wait for invalidation
log "Waiting for cache invalidation..."
aws cloudfront wait invalidation-completed \
    --distribution-id "$DISTRIBUTION_ID" \
    --id "$INVALIDATION_ID"

log "Deploy complete! https://myapp.io"`,
  },
];

export default aws;
