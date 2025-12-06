#!/bin/bash

# ============================================
# Environment Setup Checker for React Training
# macOS/Linux Version
# ============================================

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=================================================="
echo "🔍 Checking Development Environment Setup"
echo "=================================================="
echo ""

# Track if all requirements are met
ALL_CHECKS_PASSED=true

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status
print_status() {
    local tool=$1
    local status=$2
    local version=$3
    
    if [ "$status" == "ok" ]; then
        echo -e "${GREEN}✅ $tool${NC}: $version"
    elif [ "$status" == "warn" ]; then
        echo -e "${YELLOW}⚠️  $tool${NC}: $version"
    else
        echo -e "${RED}❌ $tool${NC}: Not found or not installed"
        ALL_CHECKS_PASSED=false
    fi
}

echo "📦 Checking Required Software..."
echo "--------------------------------------------------"

# 1. Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        print_status "Node.js" "ok" "$NODE_VERSION (LTS compatible)"
    else
        print_status "Node.js" "warn" "$NODE_VERSION (Please update to Node 18+ LTS)"
    fi
else
    print_status "Node.js" "error" ""
fi

# 2. npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_status "npm" "ok" "v$NPM_VERSION"
else
    print_status "npm" "error" ""
fi

# 3. nvm (optional but recommended)
if command_exists nvm; then
    NVM_VERSION=$(nvm --version)
    print_status "nvm" "ok" "v$NVM_VERSION"
elif [ -f "$HOME/.nvm/nvm.sh" ]; then
    # nvm might be installed but not in PATH
    source "$HOME/.nvm/nvm.sh"
    if command_exists nvm; then
        NVM_VERSION=$(nvm --version)
        print_status "nvm" "ok" "v$NVM_VERSION (loaded from ~/.nvm)"
    else
        print_status "nvm" "warn" "Installed but not loaded (add to shell config)"
    fi
else
    print_status "nvm" "warn" "Not installed (optional, but recommended for version management)"
fi

# 4. Git
if command_exists git; then
    GIT_VERSION=$(git --version | awk '{print $3}')
    print_status "Git" "ok" "v$GIT_VERSION"
else
    print_status "Git" "error" ""
fi

# 5. Google Chrome
if [ -d "/Applications/Google Chrome.app" ]; then
    CHROME_VERSION=$(defaults read "/Applications/Google Chrome.app/Contents/Info" CFBundleShortVersionString 2>/dev/null || echo "Unknown")
    print_status "Google Chrome" "ok" "v$CHROME_VERSION"
elif command_exists google-chrome; then
    CHROME_VERSION=$(google-chrome --version | awk '{print $3}')
    print_status "Google Chrome" "ok" "v$CHROME_VERSION"
else
    print_status "Google Chrome" "error" ""
fi

echo ""
echo "🔧 Checking Global npm Packages..."
echo "--------------------------------------------------"

# 6. ESLint (check if globally installed)
if npm list -g eslint >/dev/null 2>&1; then
    ESLINT_VERSION=$(npm list -g eslint --depth=0 2>/dev/null | grep eslint@ | awk -F@ '{print $2}')
    print_status "ESLint (global)" "ok" "v$ESLINT_VERSION"
else
    print_status "ESLint (global)" "warn" "Not globally installed (will be installed per-project)"
fi

# 7. Prettier (check if globally installed)
if npm list -g prettier >/dev/null 2>&1; then
    PRETTIER_VERSION=$(npm list -g prettier --depth=0 2>/dev/null | grep prettier@ | awk -F@ '{print $2}')
    print_status "Prettier (global)" "ok" "v$PRETTIER_VERSION"
else
    print_status "Prettier (global)" "warn" "Not globally installed (will be installed per-project)"
fi

echo ""
echo "🖥️  System Information..."
echo "--------------------------------------------------"

# Operating System
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS_VERSION=$(sw_vers -productVersion)
    echo -e "${BLUE}OS:${NC} macOS $OS_VERSION"
else
    OS_VERSION=$(uname -r)
    echo -e "${BLUE}OS:${NC} $(uname -s) $OS_VERSION"
fi

# Shell
echo -e "${BLUE}Shell:${NC} $SHELL"

# Architecture
ARCH=$(uname -m)
echo -e "${BLUE}Architecture:${NC} $ARCH"

echo ""
echo "=================================================="
echo "📊 Summary"
echo "=================================================="

if [ "$ALL_CHECKS_PASSED" = true ]; then
    echo -e "${GREEN}✅ All required software is installed!${NC}"
    echo ""
    echo "You're ready to start the React training! 🚀"
else
    echo -e "${RED}❌ Some required software is missing.${NC}"
    echo ""
    echo "Please install the missing software:"
    echo "  • Node.js: https://nodejs.org/"
    echo "  • Git: https://git-scm.com/"
    echo "  • Google Chrome: https://www.google.com/chrome/"
    echo ""
    echo "Optional but recommended:"
    echo "  • nvm: https://github.com/nvm-sh/nvm"
fi

echo ""
echo "📝 Notes:"
echo "  • ESLint & Prettier will be installed automatically per-project"
echo "  • Make sure to install VS Code extensions for the best experience"
echo ""
echo "=================================================="

# Save report to file
REPORT_FILE="environment-check-report.txt"
{
    echo "Environment Check Report"
    echo "Date: $(date)"
    echo "========================================"
    echo ""
    if command_exists node; then echo "Node.js: $(node --version)"; else echo "Node.js: NOT INSTALLED"; fi
    if command_exists npm; then echo "npm: v$(npm --version)"; else echo "npm: NOT INSTALLED"; fi
    if command_exists nvm; then echo "nvm: v$(nvm --version)"; else echo "nvm: NOT INSTALLED"; fi
    if command_exists git; then echo "Git: v$(git --version | awk '{print $3}')"; else echo "Git: NOT INSTALLED"; fi
    echo "OS: $(uname -s) $(uname -r)"
    echo "Shell: $SHELL"
} > "$REPORT_FILE"

echo "📄 Report saved to: $REPORT_FILE"
echo ""
