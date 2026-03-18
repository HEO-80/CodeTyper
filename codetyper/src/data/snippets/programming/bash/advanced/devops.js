// src/data/snippets/programming/bash/advanced/devops.js

const devops = [
  {
    id: "bash-adv-dev-001",
    title: "Deploy Script",
    difficulty: "advanced",
    description: "Script de despliegue real con git pull, build y restart",
    code: `#!/bin/bash
set -euo pipefail   # exit on error, unbound vars, pipe failures

# ── Config ─────────────────────────────────────────────────────────────────
APP_DIR="/var/www/myapp"
LOG_FILE="/var/log/deploy.log"
BRANCH="\${1:-main}"
SERVICE="myapp"

# ── Logging ────────────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
error() { log "ERROR: $*"; exit 1; }

# ── Checks ─────────────────────────────────────────────────────────────────
[ "$(id -u)" -eq 0 ] || error "Must run as root"
cd "$APP_DIR" || error "App dir not found: $APP_DIR"

# ── Deploy ─────────────────────────────────────────────────────────────────
log "Starting deploy — branch: $BRANCH"

log "Pulling latest code..."
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

log "Installing dependencies..."
npm ci --production

log "Building application..."
npm run build

log "Restarting service..."
systemctl restart "$SERVICE"

# Wait and verify
sleep 3
if systemctl is-active --quiet "$SERVICE"; then
    log "Deploy successful! Service is running."
else
    error "Service failed to start after deploy!"
fi

log "Deploy complete."`,
  },
  {
    id: "bash-adv-dev-002",
    title: "Backup Script",
    difficulty: "advanced",
    description: "Backup automatizado con tar, rsync y rotación de logs",
    code: `#!/bin/bash
set -euo pipefail

# ── Config ─────────────────────────────────────────────────────────────────
SOURCE_DIR="/var/www"
BACKUP_DIR="/backups"
REMOTE_HOST="backup-server"
REMOTE_PATH="/backups/$(hostname)"
KEEP_DAYS=7
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ── Create backup ──────────────────────────────────────────────────────────
log "Creating backup: $BACKUP_FILE"
mkdir -p "$BACKUP_DIR"

tar -czf "$BACKUP_FILE" \
    --exclude="*/node_modules" \
    --exclude="*/.git" \
    "$SOURCE_DIR"

SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
log "Backup created: $SIZE"

# ── Sync to remote ─────────────────────────────────────────────────────────
log "Syncing to $REMOTE_HOST..."
rsync -avz --progress \
    "$BACKUP_FILE" \
    "$REMOTE_HOST:$REMOTE_PATH/"

# ── Rotate old backups ─────────────────────────────────────────────────────
log "Removing backups older than $KEEP_DAYS days..."
find "$BACKUP_DIR" -name "backup_*.tar.gz" \
    -mtime "+$KEEP_DAYS" -delete

REMAINING=$(find "$BACKUP_DIR" -name "*.tar.gz" | wc -l)
log "Done. $REMAINING backup(s) retained."`,
  },
];

export default devops;
