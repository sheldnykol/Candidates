# ============================================
# Environment Setup Checker for React Training
# Windows PowerShell Version
# ============================================

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Checking Development Environment Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Track if all requirements are met
$AllChecksPassed = $true

# Function to print status
function Print-Status {
    param(
        [string]$Tool,
        [string]$Status,
        [string]$Version
    )
    
    if ($Status -eq "ok") {
        Write-Host "[OK] $Tool" -ForegroundColor Green -NoNewline
        Write-Host ": $Version"
    }
    elseif ($Status -eq "warn") {
        Write-Host "[WARN] $Tool" -ForegroundColor Yellow -NoNewline
        Write-Host ": $Version"
    }
    else {
        Write-Host "[ERROR] $Tool" -ForegroundColor Red -NoNewline
        Write-Host ": Not found or not installed"
        $script:AllChecksPassed = $false
    }
}

Write-Host "Checking Required Software..." -ForegroundColor White
Write-Host "--------------------------------------------------"

# 1. Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        $nodeMajor = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        if ($nodeMajor -ge 18) {
            Print-Status "Node.js" "ok" "$nodeVersion (LTS compatible)"
        }
        else {
            Print-Status "Node.js" "warn" "$nodeVersion (Please update to Node 18+ LTS)"
        }
    }
    else {
        Print-Status "Node.js" "error" ""
    }
}
catch {
    Print-Status "Node.js" "error" ""
}

# 2. npm
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Print-Status "npm" "ok" "v$npmVersion"
    }
    else {
        Print-Status "npm" "error" ""
    }
}
catch {
    Print-Status "npm" "error" ""
}

# 3. nvm for Windows
try {
    $nvmVersion = nvm version 2>$null
    if ($nvmVersion) {
        Print-Status "nvm-windows" "ok" "$nvmVersion"
    }
    else {
        Print-Status "nvm-windows" "warn" "Not installed (optional, but recommended for version management)"
    }
}
catch {
    Print-Status "nvm-windows" "warn" "Not installed (optional, but recommended for version management)"
}

# 4. Git
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        $gitVer = $gitVersion -replace 'git version ', ''
        Print-Status "Git" "ok" "v$gitVer"
    }
    else {
        Print-Status "Git" "error" ""
    }
}
catch {
    Print-Status "Git" "error" ""
}

# 5. Google Chrome
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LocalAppData}\Google\Chrome\Application\chrome.exe"
)

$chromeFound = $false
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        try {
            $chromeVersion = (Get-Item $path).VersionInfo.FileVersion
            Print-Status "Google Chrome" "ok" "v$chromeVersion"
            $chromeFound = $true
            break
        }
        catch {
            continue
        }
    }
}

if (-not $chromeFound) {
    Print-Status "Google Chrome" "error" ""
}

Write-Host ""
Write-Host "Checking Global npm Packages..." -ForegroundColor White
Write-Host "--------------------------------------------------"

# 6. ESLint (check if globally installed)
try {
    $eslintCheck = npm list -g eslint 2>$null | Select-String "eslint@"
    if ($eslintCheck) {
        $eslintVersion = ($eslintCheck -split '@')[1] -replace ' .*', ''
        Print-Status "ESLint (global)" "ok" "v$eslintVersion"
    }
    else {
        Print-Status "ESLint (global)" "warn" "Not globally installed (will be installed per-project)"
    }
}
catch {
    Print-Status "ESLint (global)" "warn" "Not globally installed (will be installed per-project)"
}

# 7. Prettier (check if globally installed)
try {
    $prettierCheck = npm list -g prettier 2>$null | Select-String "prettier@"
    if ($prettierCheck) {
        $prettierVersion = ($prettierCheck -split '@')[1] -replace ' .*', ''
        Print-Status "Prettier (global)" "ok" "v$prettierVersion"
    }
    else {
        Print-Status "Prettier (global)" "warn" "Not globally installed (will be installed per-project)"
    }
}
catch {
    Print-Status "Prettier (global)" "warn" "Not globally installed (will be installed per-project)"
}

Write-Host ""
Write-Host "System Information..." -ForegroundColor White
Write-Host "--------------------------------------------------"

# Operating System
$osInfo = Get-CimInstance Win32_OperatingSystem
Write-Host "OS: " -NoNewline -ForegroundColor Blue
Write-Host "$($osInfo.Caption) (Build $($osInfo.BuildNumber))"

# PowerShell Version
Write-Host "PowerShell: " -NoNewline -ForegroundColor Blue
Write-Host "$($PSVersionTable.PSVersion)"

# Architecture
Write-Host "Architecture: " -NoNewline -ForegroundColor Blue
Write-Host "$($env:PROCESSOR_ARCHITECTURE)"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

if ($AllChecksPassed) {
    Write-Host "[OK] All required software is installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You're ready to start the React training!" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Some required software is missing." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install the missing software:"
    Write-Host "  - Node.js: https://nodejs.org/"
    Write-Host "  - Git: https://git-scm.com/"
    Write-Host "  - Google Chrome: https://www.google.com/chrome/"
    Write-Host ""
    Write-Host "Optional but recommended:"
    Write-Host "  - nvm-windows: https://github.com/coreybutler/nvm-windows"
}

Write-Host ""
Write-Host "Notes:" -ForegroundColor Yellow
Write-Host "  - ESLint and Prettier will be installed automatically per-project"
Write-Host "  - Make sure to install VS Code extensions for the best experience"
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan

# Save report to file
$reportFile = "environment-check-report.txt"
$reportContent = @"
Environment Check Report
Date: $(Get-Date)
========================================

Node.js: $(if (Get-Command node -ErrorAction SilentlyContinue) { node --version } else { "NOT INSTALLED" })
npm: $(if (Get-Command npm -ErrorAction SilentlyContinue) { "v$(npm --version)" } else { "NOT INSTALLED" })
nvm-windows: $(if (Get-Command nvm -ErrorAction SilentlyContinue) { nvm version } else { "NOT INSTALLED" })
Git: $(if (Get-Command git -ErrorAction SilentlyContinue) { git --version } else { "NOT INSTALLED" })
OS: $($osInfo.Caption) (Build $($osInfo.BuildNumber))
PowerShell: $($PSVersionTable.PSVersion)
"@

$reportContent | Out-File -FilePath $reportFile -Encoding UTF8

Write-Host "Report saved to: $reportFile" -ForegroundColor Cyan
Write-Host ""
