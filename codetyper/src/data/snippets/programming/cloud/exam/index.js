// src/data/snippets/programming/cloud/exam/index.js

const exam = [
  {
    id: "cloud-exam-001",
    title: "Cloud Full — Azure + AWS Comparison",
    difficulty: "advanced",
    description: "Mismo flujo de despliegue en Azure CLI y AWS CLI lado a lado",
    code: `# ══ DEPLOY WEB APP ══════════════════════════════════════════════════════════
# This script shows equivalent commands for Azure and AWS
# Run with: bash deploy.sh --provider azure|aws --env prod

#!/bin/bash
set -euo pipefail

PROVIDER="\${1:-azure}"
ENV="\${2:-staging}"
APP="myapp"
REGION_AZ="westeurope"
REGION_AWS="eu-west-1"

log() { echo "[$(date '+%H:%M:%S')] [$PROVIDER] $*"; }

deploy_azure() {
    local rg="rg-$APP-$ENV"
    local plan="plan-$APP-$ENV"
    local webapp="$APP-$ENV"

    log "Creating resource group: $rg"
    az group create --name "$rg" --location "$REGION_AZ"

    log "Creating App Service plan..."
    az appservice plan create \
        --name "$plan" \
        --resource-group "$rg" \
        --sku "B2" --is-linux

    log "Creating web app..."
    az webapp create \
        --resource-group "$rg" \
        --plan "$plan" \
        --name "$webapp" \
        --runtime "NODE:20-lts"

    az webapp config appsettings set \
        --resource-group "$rg" \
        --name "$webapp" \
        --settings NODE_ENV="$ENV"

    log "Azure deploy complete: https://$webapp.azurewebsites.net"
}

deploy_aws() {
    local bucket="$APP-assets-$ENV"

    log "Creating S3 bucket: $bucket"
    aws s3 mb "s3://$bucket" --region "$REGION_AWS"

    log "Building & uploading..."
    npm run build
    aws s3 sync ./dist/ "s3://$bucket/" --delete \
        --cache-control "public, max-age=86400"

    aws s3 cp ./dist/index.html "s3://$bucket/index.html" \
        --cache-control "no-cache"

    log "AWS deploy complete: http://$bucket.s3-website.$REGION_AWS.amazonaws.com"
}

# Main
case $PROVIDER in
    azure) deploy_azure ;;
    aws)   deploy_aws ;;
    *)     echo "Usage: $0 azure|aws [staging|prod]"; exit 1 ;;
esac`,
  },
];

export default exam;
