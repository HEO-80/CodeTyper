// src/data/snippets/programming/powershell/intermediate/scripting.js

const scripting = [
  {
    id: "ps-int-scr-001",
    title: "Loops & Control Flow",
    difficulty: "intermediate",
    description: "for, foreach, while, do-while, switch en PowerShell",
    code: `# for loop
for ($i = 0; $i -lt 5; $i++) {
    Write-Host "Index: $i"
}

# foreach
$servers = @("web01", "web02", "db01", "db02")
foreach ($server in $servers) {
    Write-Host "Pinging $server..."
    # Test-Connection $server -Count 1 -Quiet
}

# Range operator
1..10 | ForEach-Object {
    if ($_ % 2 -eq 0) { Write-Host "$_ is even" }
}

# while
$attempts = 0
while ($attempts -lt 3) {
    Write-Host "Attempt $($attempts + 1)"
    $attempts++
}

# do-while
do {
    $input = Read-Host "Enter 'yes' to continue"
} while ($input -ne "yes")

# switch
$day = (Get-Date).DayOfWeek
switch ($day) {
    "Monday"   { Write-Host "Start of week" }
    "Friday"   { Write-Host "TGIF!" }
    { $_ -in "Saturday","Sunday" } { Write-Host "Weekend!" }
    default    { Write-Host "Midweek" }
}`,
  },
  {
    id: "ps-int-scr-002",
    title: "Working with Processes & Services",
    difficulty: "intermediate",
    description: "Get-Process, Get-Service, Stop, Start y monitoreo",
    code: `# Processes
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5

# Find specific process
$chrome = Get-Process -Name "chrome" -ErrorAction SilentlyContinue
if ($chrome) {
    Write-Host "Chrome is running — PID: $($chrome.Id)"
    Write-Host "Memory: $([math]::Round($chrome.WorkingSet/1MB, 2)) MB"
}

# Kill process
# Stop-Process -Name "notepad" -Force

# Services
Get-Service | Where-Object Status -eq "Running" |
    Select-Object Name, DisplayName, Status |
    Sort-Object Name

# Start / Stop / Restart service
# Start-Service   -Name "wuauserv"
# Stop-Service    -Name "wuauserv" -Force
# Restart-Service -Name "wuauserv"

# Monitor service and restart if stopped
$serviceName = "Spooler"
$svc = Get-Service -Name $serviceName

if ($svc.Status -ne "Running") {
    Write-Warning "$serviceName is not running. Starting..."
    Start-Service -Name $serviceName
    Write-Host "$serviceName started." -ForegroundColor Green
} else {
    Write-Host "$serviceName is running." -ForegroundColor Green
}`,
  },
];

export default scripting;
