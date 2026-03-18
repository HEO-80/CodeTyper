// src/data/snippets/programming/cloud/azure/index.js

const azure = [
  {
    id: "cloud-az-beg-001",
    title: "Azure CLI — Login & Basics",
    difficulty: "beginner",
    description: "Login, suscripciones, grupos de recursos y info de cuenta",
    code: `# Login to Azure
az login
az login --use-device-code        # for headless environments

# Account info
az account show
az account list --output table
az account set --subscription "My Subscription"

# Resource groups
az group list --output table
az group create \
    --name "rg-myapp-prod" \
    --location "westeurope"

az group show --name "rg-myapp-prod"
az group delete --name "rg-myapp-prod" --yes --no-wait

# Locations & help
az account list-locations --output table
az find "az vm"                    # search commands
az vm --help`,
  },
  {
    id: "cloud-az-beg-002",
    title: "Azure VM — Create & Manage",
    difficulty: "beginner",
    description: "Crear, arrancar, parar y conectarse a una VM en Azure",
    code: `# Create a Linux VM
az vm create \
    --resource-group "rg-myapp-prod" \
    --name "vm-webserver" \
    --image "Ubuntu2204" \
    --size "Standard_B2s" \
    --admin-username "azureuser" \
    --ssh-key-values ~/.ssh/id_rsa.pub \
    --public-ip-sku Standard

# List VMs
az vm list --output table
az vm list --resource-group "rg-myapp-prod" --output table

# Start / Stop / Restart
az vm start   --resource-group "rg-myapp-prod" --name "vm-webserver"
az vm stop    --resource-group "rg-myapp-prod" --name "vm-webserver"
az vm restart --resource-group "rg-myapp-prod" --name "vm-webserver"

# Get public IP
az vm show \
    --resource-group "rg-myapp-prod" \
    --name "vm-webserver" \
    --show-details \
    --query publicIps -o tsv

# Connect via SSH
ssh azureuser@<public-ip>

# Delete VM
az vm delete \
    --resource-group "rg-myapp-prod" \
    --name "vm-webserver" --yes`,
  },
  {
    id: "cloud-az-int-001",
    title: "Azure App Service",
    difficulty: "intermediate",
    description: "Desplegar una web app en Azure App Service",
    code: `# Create App Service Plan
az appservice plan create \
    --name "plan-myapp" \
    --resource-group "rg-myapp-prod" \
    --sku "B2" \
    --is-linux

# Create Web App (Node.js)
az webapp create \
    --resource-group "rg-myapp-prod" \
    --plan "plan-myapp" \
    --name "webapp-myapp-prod" \
    --runtime "NODE:20-lts"

# Configure app settings (env vars)
az webapp config appsettings set \
    --resource-group "rg-myapp-prod" \
    --name "webapp-myapp-prod" \
    --settings \
        NODE_ENV="production" \
        DATABASE_URL="$DB_URL" \
        API_KEY="$API_KEY"

# Deploy from local git
az webapp deployment source config-local-git \
    --resource-group "rg-myapp-prod" \
    --name "webapp-myapp-prod"

# Deploy from GitHub
az webapp deployment source config \
    --resource-group "rg-myapp-prod" \
    --name "webapp-myapp-prod" \
    --repo-url "https://github.com/HEO-80/myapp" \
    --branch "main" \
    --manual-integration

# View logs
az webapp log tail \
    --resource-group "rg-myapp-prod" \
    --name "webapp-myapp-prod"`,
  },
  {
    id: "cloud-az-int-002",
    title: "Azure Storage & KeyVault",
    difficulty: "intermediate",
    description: "Blob Storage para archivos y Key Vault para secretos",
    code: `# ── Storage Account ────────────────────────────────────────────────────────
az storage account create \
    --name "stmyappprod" \
    --resource-group "rg-myapp-prod" \
    --location "westeurope" \
    --sku "Standard_LRS"

# Create container
az storage container create \
    --name "uploads" \
    --account-name "stmyappprod" \
    --public-access "blob"

# Upload blob
az storage blob upload \
    --account-name "stmyappprod" \
    --container-name "uploads" \
    --name "photo.jpg" \
    --file "./photo.jpg"

# List blobs
az storage blob list \
    --account-name "stmyappprod" \
    --container-name "uploads" \
    --output table

# ── Key Vault ──────────────────────────────────────────────────────────────
az keyvault create \
    --name "kv-myapp-prod" \
    --resource-group "rg-myapp-prod" \
    --location "westeurope"

# Store secrets
az keyvault secret set \
    --vault-name "kv-myapp-prod" \
    --name "DatabasePassword" \
    --value "$DB_PASSWORD"

# Read secret
az keyvault secret show \
    --vault-name "kv-myapp-prod" \
    --name "DatabasePassword" \
    --query value -o tsv`,
  },
  {
    id: "cloud-az-adv-001",
    title: "Azure PowerShell — Az Module",
    difficulty: "advanced",
    description: "Gestión de Azure con PowerShell Az module",
    code: `# Install Az module
Install-Module -Name Az -Scope CurrentUser -Force

# Connect
Connect-AzAccount
Connect-AzAccount -TenantId $tenantId

# Get context
Get-AzContext
Set-AzContext -SubscriptionId $subscriptionId

# Resource groups
Get-AzResourceGroup | Select-Object ResourceGroupName, Location
New-AzResourceGroup -Name "rg-myapp-prod" -Location "westeurope"

# Virtual Machines
Get-AzVM | Select-Object Name, ResourceGroupName
$vm = Get-AzVM -ResourceGroupName "rg-myapp-prod" -Name "vm-web"
Start-AzVM -ResourceGroupName "rg-myapp-prod" -Name "vm-web"
Stop-AzVM -ResourceGroupName "rg-myapp-prod" -Name "vm-web" -Force

# Key Vault from PowerShell
$secret = Get-AzKeyVaultSecret -VaultName "kv-myapp-prod" -Name "DatabasePassword" -AsPlainText

# Deploy ARM template
New-AzResourceGroupDeployment -ResourceGroupName "rg-myapp-prod" -TemplateFile "./azuredeploy.json" -TemplateParameterFile "./azuredeploy.parameters.json"`,
  },
];

export default azure;
