// src/data/snippets/programming/powershell/intermediate/functions.js

const functions = [
  {
    id: "ps-int-fn-001",
    title: "Functions & Parameters",
    difficulty: "intermediate",
    description: "Funciones avanzadas con parámetros tipados y validación",
    code: `function Get-UserInfo {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]$Username,

        [Parameter(Mandatory = $false)]
        [ValidateSet("basic", "full", "admin")]
        [string]$Level = "basic",

        [switch]$IncludeGroups
    )

    Write-Verbose "Fetching info for: $Username"

    $user = [PSCustomObject]@{
        Username = $Username
        Level    = $Level
        Created  = Get-Date
    }

    if ($IncludeGroups) {
        $user | Add-Member -MemberType NoteProperty `
            -Name Groups -Value @("users", "developers")
    }

    return $user
}

# Call the function
$info = Get-UserInfo -Username "ada" -Level "full" -IncludeGroups -Verbose
$info | Format-List

# Pipeline input
function Show-Item {
    param([Parameter(ValueFromPipeline)]$Item)
    process { Write-Host "Item: $Item" }
}

1..5 | Show-Item`,
  },
  {
    id: "ps-int-fn-002",
    title: "Error Handling",
    difficulty: "intermediate",
    description: "Try/Catch/Finally, $ErrorActionPreference y Write-Error",
    code: `# Basic try/catch
try {
    $result = 10 / 0
    Get-Item "C:\nonexistent\file.txt" -ErrorAction Stop
} catch [System.DivideByZeroException] {
    Write-Error "Division by zero: $_"
} catch [System.IO.FileNotFoundException] {
    Write-Warning "File not found: $($_.Exception.Message)"
} catch {
    Write-Error "Unexpected error: $($_.Exception.Message)"
} finally {
    Write-Host "Always runs — cleanup here"
}

# ErrorAction preference
$ErrorActionPreference = "Stop"   # Stop, Continue, SilentlyContinue

# Custom error
function Invoke-SafeDelete {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw [System.IO.FileNotFoundException]::new(
            "Path not found: $Path"
        )
    }

    try {
        Remove-Item $Path -Force
        Write-Host "Deleted: $Path" -ForegroundColor Green
    } catch {
        Write-Error "Failed to delete $Path : $_"
    }
}

Invoke-SafeDelete -Path ".\temp.txt"`,
  },
];

export default functions;
