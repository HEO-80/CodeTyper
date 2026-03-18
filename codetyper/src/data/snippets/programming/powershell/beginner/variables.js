// src/data/snippets/programming/powershell/beginner/variables.js

const variables = [
  {
    id: "ps-beg-var-001",
    title: "Variables & Types",
    difficulty: "beginner",
    description: "Variables, tipos básicos y string interpolation",
    code: `# Variables start with $
$name = "Ada Lovelace"
$age = 28
$isActive = $true
$price = 19.99

# String interpolation
$greeting = "Hello, $name! You are $age years old."
Write-Host $greeting

# Strong typing
[int]$count = 10
[string]$city = "Madrid"
[bool]$enabled = $false
[datetime]$today = Get-Date

# Multiple assignment
$x = $y = $z = 0

Write-Host "City: $city"
Write-Host "Today: $($today.ToShortDateString())"
Write-Host "Type: $($count.GetType().Name)"`,
  },
  {
    id: "ps-beg-var-002",
    title: "Arrays & HashTables",
    difficulty: "beginner",
    description: "Arrays, listas y hashtables en PowerShell",
    code: `# Array
$fruits = @("apple", "banana", "cherry")
$fruits += "mango"

Write-Host "Count: $($fruits.Count)"
Write-Host "First: $($fruits[0])"
Write-Host "Last:  $($fruits[-1])"

# Iterate array
foreach ($fruit in $fruits) {
    Write-Host $fruit.ToUpper()
}

# HashTable (like a dictionary)
$user = @{
    Name     = "Alan Turing"
    Age      = 41
    City     = "London"
    Active   = $true
}

# Access values
Write-Host $user.Name
Write-Host $user["City"]

# Add / update
$user.Email = "alan@code.io"
$user["Age"] = 42

# Iterate hashtable
foreach ($key in $user.Keys) {
    Write-Host "$key : $($user[$key])"
}`,
  },
  {
    id: "ps-beg-var-003",
    title: "Conditionals & Operators",
    difficulty: "beginner",
    description: "if/elseif/else, operadores de comparación y lógicos",
    code: `$score = 85

# Comparison operators
# -eq, -ne, -gt, -lt, -ge, -le
# -like, -match, -contains

if ($score -ge 90) {
    Write-Host "Grade: A"
} elseif ($score -ge 80) {
    Write-Host "Grade: B"
} elseif ($score -ge 70) {
    Write-Host "Grade: C"
} else {
    Write-Host "Grade: F"
}

# String operators
$name = "PowerShell"
if ($name -like "Power*") {
    Write-Host "Starts with Power"
}

if ($name -match "^Power\w+") {
    Write-Host "Regex match!"
}

# Logical operators: -and, -or, -not
$age = 25
$hasLicense = $true

if ($age -ge 18 -and $hasLicense) {
    Write-Host "Can drive"
}

# Ternary-style (PS 7+)
$status = $score -ge 70 ? "Pass" : "Fail"
Write-Host "Status: $status"`,
  },
];

export default variables;
