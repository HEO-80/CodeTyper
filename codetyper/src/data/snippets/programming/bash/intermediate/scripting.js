// src/data/snippets/programming/bash/intermediate/scripting.js

const scripting = [
  {
    id: "bash-int-scr-001",
    title: "Script Arguments & Input",
    difficulty: "intermediate",
    description: "Parámetros $1..$n, getopts y lectura de input",
    code: `#!/bin/bash

# Script name and arguments
echo "Script: $0"
echo "Args:   $#"
echo "All:    $@"
echo "First:  $1"
echo "Second: $2"

# getopts — parse flags
usage() {
    echo "Usage: $0 -u <user> -e <env> [-v]"
    exit 1
}

verbose=false
while getopts "u:e:vh" opt; do
    case $opt in
        u) user="$OPTARG" ;;
        e) env="$OPTARG" ;;
        v) verbose=true ;;
        h) usage ;;
        *) usage ;;
    esac
done

# Validate required args
if [ -z "$user" ] || [ -z "$env" ]; then
    echo "Error: -u and -e are required"
    usage
fi

echo "User: $user | Env: $env | Verbose: $verbose"

# Interactive input
read -p "Enter your name: " name
read -sp "Enter password: " password
echo ""
echo "Hello, $name!"

# Read from file line by line
while IFS= read -r line; do
    echo "Line: $line"
done < "servers.txt"`,
  },
  {
    id: "bash-int-scr-002",
    title: "Process & System Management",
    difficulty: "intermediate",
    description: "ps, kill, systemctl, cron y gestión de procesos",
    code: `#!/bin/bash

# Process management
ps aux                         # all processes
ps aux | grep nginx            # find process
pgrep -f "node"                # get PIDs by name
pkill -f "node"                # kill by name
kill -9 1234                   # kill by PID

# Check if process is running
if pgrep -x "nginx" > /dev/null; then
    echo "nginx is running"
fi

# systemctl — service management
systemctl status nginx
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl enable nginx         # start on boot
systemctl disable nginx

# Check service status in script
if systemctl is-active --quiet nginx; then
    echo "nginx active"
else
    echo "nginx inactive — restarting..."
    systemctl restart nginx
fi

# Disk & memory
df -h                          # disk usage
df -h /                        # root partition
du -sh /var/log                # folder size
free -h                        # memory usage

# System info
uname -a                       # kernel info
uptime                         # system uptime
top -bn1 | head -20            # snapshot of top`,
  },
];

export default scripting;
