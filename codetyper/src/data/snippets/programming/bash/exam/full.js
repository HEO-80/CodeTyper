// src/data/snippets/programming/bash/exam/full.js

const exam = [
  {
    id: "bash-exam-001",
    title: "Bash Full — Server Setup Script",
    difficulty: "advanced",
    description: "Variables, funciones, loops, getopts, curl y systemctl en un script real",
    code: `#!/bin/bash
set -euo pipefail

# ── Server Setup Script ────────────────────────────────────────────────────
# Installs Node.js app, configures nginx and starts the service

# 1. Config & args
APP_NAME="myapp"
APP_DIR="/var/www/$APP_NAME"
NODE_VERSION="20"
LOG="/var/log/setup.log"
DOMAIN=""
ENV="production"

log()   { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }
error() { log "ERROR: $*"; exit 1; }
ok()    { log "OK: $*"; }

# 2. Parse flags
while getopts "d:e:h" opt; do
    case $opt in
        d) DOMAIN="$OPTARG" ;;
        e) ENV="$OPTARG" ;;
        h) echo "Usage: $0 -d domain.com [-e env]"; exit 0 ;;
        *) error "Unknown option" ;;
    esac
done

[ -z "$DOMAIN" ] && error "Domain is required: -d domain.com"
[ "$(id -u)" -eq 0 ] || error "Must run as root"

# 3. Install dependencies
log "Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs nginx > /dev/null

ok "Node $(node -v) installed"

# 4. Setup app directory
log "Setting up $APP_DIR..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ -d ".git" ]; then
    log "Updating existing repo..."
    git pull origin main
else
    log "Cloning repository..."
    git clone https://github.com/HEO-80/$APP_NAME.git .
fi

npm ci --production
npm run build

# 5. Configure nginx
log "Configuring nginx for $DOMAIN..."
cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
    }
}
EOF

ln -sf /etc/nginx/sites-available/$APP_NAME \
       /etc/nginx/sites-enabled/$APP_NAME

nginx -t && systemctl reload nginx
ok "nginx configured for $DOMAIN"

# 6. Start service
log "Starting $APP_NAME service..."
systemctl enable "$APP_NAME" 2>/dev/null || true
systemctl restart "$APP_NAME"

sleep 2
if systemctl is-active --quiet "$APP_NAME"; then
    ok "Service is running"
else
    error "Service failed to start"
fi

log "Setup complete! Visit http://$DOMAIN"`,
  },
];

export default exam;
