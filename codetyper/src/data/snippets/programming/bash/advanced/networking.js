// src/data/snippets/programming/bash/advanced/networking.js

const networking = [
  {
    id: "bash-adv-net-001",
    title: "Network & SSH",
    difficulty: "advanced",
    description: "curl, wget, ssh, scp y diagnóstico de red",
    code: `#!/bin/bash

# curl — HTTP requests
curl https://api.github.com/users/HEO-80
curl -s -o /dev/null -w "%{http_code}" https://myapp.io

# POST with JSON
curl -X POST https://api.myapp.io/users \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name":"Ada","email":"ada@code.io"}'

# Download file
wget -q https://example.com/file.tar.gz
curl -LO https://example.com/file.tar.gz

# SSH
ssh user@server.io
ssh -p 2222 user@server.io
ssh -i ~/.ssh/id_rsa user@server.io "ls -la /var/www"

# scp — copy files over SSH
scp file.txt user@server.io:/tmp/
scp -r ./dist/ user@server.io:/var/www/

# Network diagnostics
ping -c 4 google.com
traceroute google.com
nslookup myapp.io
dig myapp.io

# Check open ports
ss -tlnp
netstat -tlnp
lsof -i :3000

# Check connectivity
curl -s --connect-timeout 5 https://myapp.io > /dev/null \
    && echo "Site is UP" \
    || echo "Site is DOWN"`,
  },
  {
    id: "bash-adv-net-002",
    title: "Log Analysis & Monitoring",
    difficulty: "advanced",
    description: "Analizar logs con grep, awk, sed y generar reportes",
    code: `#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"
REPORT_FILE="/tmp/report_$(date +%Y%m%d).txt"

# ── Parse nginx access log ─────────────────────────────────────────────────
echo "=== NGINX ACCESS REPORT $(date) ===" > "$REPORT_FILE"

# Top 10 IPs
echo -e "\n--- Top 10 IPs ---" >> "$REPORT_FILE"
awk '{print $1}' "$LOG_FILE" | \
    sort | uniq -c | sort -rn | head -10 >> "$REPORT_FILE"

# Top 10 URLs
echo -e "\n--- Top 10 URLs ---" >> "$REPORT_FILE"
awk '{print $7}' "$LOG_FILE" | \
    sort | uniq -c | sort -rn | head -10 >> "$REPORT_FILE"

# HTTP status codes
echo -e "\n--- Status Codes ---" >> "$REPORT_FILE"
awk '{print $9}' "$LOG_FILE" | \
    sort | uniq -c | sort -rn >> "$REPORT_FILE"

# 5xx errors
echo -e "\n--- 5xx Errors ---" >> "$REPORT_FILE"
grep '" 5[0-9][0-9] ' "$LOG_FILE" | tail -20 >> "$REPORT_FILE"

# Requests per hour
echo -e "\n--- Requests per Hour ---" >> "$REPORT_FILE"
awk '{print $4}' "$LOG_FILE" | \
    cut -d: -f2 | sort | uniq -c >> "$REPORT_FILE"

cat "$REPORT_FILE"
echo "Report saved: $REPORT_FILE"`,
  },
];

export default networking;
