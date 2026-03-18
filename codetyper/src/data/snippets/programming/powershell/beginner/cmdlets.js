// src/data/snippets/programming/powershell/beginner/cmdlets.js

const cmdlets = [
  {
    id: "ps-beg-cmd-001",
    title: "Basic Cmdlets",
    difficulty: "beginner",
    description: "Get-Help, Get-Command, Write-Host, Read-Host",
    code: `# Get help for any cmdlet
Get-Help Get-Process
Get-Help Get-Process -Examples
Get-Help Get-Process -Full

# Discover cmdlets
Get-Command -Verb Get
Get-Command -Noun Process
Get-Command "*service*"

# Output
Write-Host "Hello World" -ForegroundColor Green
Write-Host "Error!" -ForegroundColor Red -BackgroundColor Black
Write-Output "This goes to pipeline"
Write-Warning "This is a warning"
Write-Error "This is an error"
Write-Verbose "Debug info" -Verbose

# Input
$name = Read-Host "Enter your name"
$pass = Read-Host "Enter password" -AsSecureString

Write-Host "Welcome, $name!"

# Clear screen
Clear-Host`,
  },
  {
    id: "ps-beg-cmd-002",
    title: "Filesystem Cmdlets",
    difficulty: "beginner",
    description: "Navegar y manipular archivos y carpetas",
    code: `# Navigate filesystem
Get-Location          # pwd equivalent
Set-Location C:\Users # cd equivalent
Set-Location ..       # go up one level

# List files
Get-ChildItem                    # ls / dir
Get-ChildItem -Path C:\Projects
Get-ChildItem *.txt              # filter by extension
Get-ChildItem -Recurse -Filter "*.log"

# Create / delete
New-Item -Path "C:\Projects\myapp" -ItemType Directory
New-Item -Path ".\config.json"   -ItemType File
Remove-Item ".\old-file.txt"
Remove-Item ".\old-folder" -Recurse -Force

# Copy / move
Copy-Item ".\source.txt" -Destination ".\backup.txt"
Move-Item ".\file.txt"   -Destination "C:\Archive\"

# Read / write files
$content = Get-Content ".\config.json"
Set-Content -Path ".\output.txt" -Value "Hello World"
Add-Content -Path ".\log.txt"    -Value "New log entry"

# Test if exists
if (Test-Path ".\config.json") {
    Write-Host "File exists!"
}`,
  },
  {
    id: "ps-beg-cmd-003",
    title: "Pipeline & Filtering",
    difficulty: "beginner",
    description: "El pipe | y cmdlets Where-Object, Select-Object, Sort-Object",
    code: `# Pipeline passes objects between cmdlets
Get-Process | Where-Object { $_.CPU -gt 100 }

# Where-Object shorthand (PS 3+)
Get-Process | Where-Object CPU -gt 100

# Select specific properties
Get-Process |
    Select-Object Name, CPU, WorkingSet |
    Sort-Object CPU -Descending |
    Select-Object -First 10

# Format output
Get-Process | Format-Table Name, CPU, ID -AutoSize
Get-Process | Format-List Name, CPU, ID

# Measure
Get-ChildItem C:\Windows -Recurse |
    Measure-Object -Property Length -Sum -Average

# Group
Get-Process |
    Group-Object Company |
    Sort-Object Count -Descending

# ForEach-Object in pipeline
1..5 | ForEach-Object { $_ * $_ }

Get-ChildItem *.txt |
    ForEach-Object {
        Write-Host "Processing: $($_.Name)"
    }`,
  },
];

export default cmdlets;
