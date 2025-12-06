#!/bin/bash

# Code Smell Analysis Script for React/TypeScript Projects
# This script detects various code smells and anti-patterns

# ============================================
# CONFIGURATION
# ============================================

# Directories to analyze (only Training-Files where student exercises are)
ANALYZE_DIRS="src/Components/Training-Files"

# Directories to always exclude (tests, node_modules, build artifacts)
EXCLUDE_DIRS="__tests__ test node_modules dist build coverage"

# Files to exclude (none needed - we want all student exercise files)
EXCLUDE_FILES=""

# Build grep exclude pattern
EXCLUDE_PATTERN=""
for dir in $EXCLUDE_DIRS; do
  EXCLUDE_PATTERN="$EXCLUDE_PATTERN --exclude-dir=$dir"
done

if [ -n "$EXCLUDE_FILES" ]; then
  for file in $EXCLUDE_FILES; do
    EXCLUDE_PATTERN="$EXCLUDE_PATTERN --exclude=$file"
  done
fi

echo "🔍 Starting comprehensive code smell analysis..."
echo "=================================================="
echo "📁 Analyzing: $ANALYZE_DIRS/ (all student exercises)"
echo "🚫 Excluding: $EXCLUDE_DIRS"
echo "=================================================="

# Initialize counters
TOTAL_ISSUES=0
CRITICAL_ISSUES=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to print results
print_result() {
    local count=$1
    local message=$2
    local severity=$3
    
    if [ "$count" -gt 0 ]; then
        if [ "$severity" == "critical" ]; then
            echo -e "${RED}❌ $message: $count${NC}"
            CRITICAL_ISSUES=$((CRITICAL_ISSUES + count))
        else
            echo -e "${YELLOW}⚠️  $message: $count${NC}"
            WARNINGS=$((WARNINGS + count))
        fi
        TOTAL_ISSUES=$((TOTAL_ISSUES + count))
    else
        echo -e "${GREEN}✅ $message: None found${NC}"
    fi
}

echo ""
echo "1️⃣  Checking for debugging artifacts..."
echo "----------------------------------------"

# Debugger statements
DEBUGGER_COUNT=$(grep -rn "debugger" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$DEBUGGER_COUNT" "Debugger statements" "critical"

# Console statements (excluding tests and error handlers in catch blocks)
# Allow console.error in catch blocks for error handling
CONSOLE_COUNT=$(grep -rn "console\." $ANALYZE_DIRS --include="*.ts" --include="*.tsx" --exclude="*.test.*" $EXCLUDE_PATTERN 2>/dev/null | \
  grep -v "console\.error.*catch\|catch.*console\.error" | \
  awk '
    # Track if we are in a catch block
    /catch\s*\(/ { in_catch=1; catch_start=NR }
    in_catch && /console\./ && NR <= catch_start + 20 { next }
    in_catch && /}/ { in_catch=0 }
    /console\./ && !in_catch { print }
  ' 2>/dev/null | wc -l | tr -d ' ')
print_result "$CONSOLE_COUNT" "Console statements (excluding error handlers)" "warning"

# Alert statements
ALERT_COUNT=$(grep -rn "alert(" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$ALERT_COUNT" "Alert statements" "critical"

echo ""
echo "2️⃣  Checking TypeScript quality..."
echo "----------------------------------------"

# Any type usage
ANY_COUNT=$(grep -rn ": any\|<any>" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" --exclude="*.test.*" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$ANY_COUNT" "Type 'any' usage" "warning"

# @ts-ignore / @ts-expect-error
TS_IGNORE_COUNT=$(grep -rn "@ts-ignore\|@ts-expect-error" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$TS_IGNORE_COUNT" "TypeScript suppressions" "warning"

# eslint-disable comments
ESLINT_DISABLE=$(grep -rn "eslint-disable" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$ESLINT_DISABLE" "ESLint suppressions" "warning"

echo ""
echo "3️⃣  Checking code maintenance..."
echo "----------------------------------------"

# TODO/FIXME comments (only in student code, not instructor TODOs)
# Exclude lines that are clearly instructor comments like "TODO: Build this..." or "// TODO for students:"
TODO_COUNT=$(grep -rin "TODO\|FIXME\|HACK\|XXX\|BUG" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | \
  grep -v "TODO: Build\|TODO for students\|TODO - students\|INSTRUCTOR TODO\|@TODO" | wc -l | tr -d ' ')
print_result "$TODO_COUNT" "TODO/FIXME comments (student)" "warning"

# Commented out code (actual code patterns, not legitimate comments)
# Look for patterns like: // const, // function, // import, // export, // return, etc.
COMMENTED_CODE=$(grep -rn "^[[:space:]]*//[[:space:]]*\(const\|let\|var\|function\|import\|export\|return\|if\|for\|while\|class\|interface\|type\|async\|await\)" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$COMMENTED_CODE" "Commented-out code (not comments)" "warning"

echo ""
echo "4️⃣  Checking file and function complexity..."
echo "----------------------------------------"

# Large files (>300 lines of code)
if command -v find &> /dev/null; then
    # Only check student directories, exclude config files
    LARGE_FILES=0
    for dir in $ANALYZE_DIRS; do
        if [ -d "$dir" ]; then
            COUNT=$(find $dir \( -name "*.ts" -o -name "*.tsx" \) -type f -exec sh -c 'wc -l "$1" | awk "{if (\$1 > 300) print \$0}"' _ {} \; 2>/dev/null | wc -l | tr -d ' ')
            LARGE_FILES=$((LARGE_FILES + COUNT))
        fi
    done
    print_result "$LARGE_FILES" "Large files (>300 lines)" "warning"
    
    # Very large files (>500 lines)
    VERY_LARGE_FILES=0
    for dir in $ANALYZE_DIRS; do
        if [ -d "$dir" ]; then
            COUNT=$(find $dir \( -name "*.ts" -o -name "*.tsx" \) -type f -exec sh -c 'wc -l "$1" | awk "{if (\$1 > 500) print \$0}"' _ {} \; 2>/dev/null | wc -l | tr -d ' ')
            VERY_LARGE_FILES=$((VERY_LARGE_FILES + COUNT))
        fi
    done
    print_result "$VERY_LARGE_FILES" "Very large files (>500 lines)" "critical"
fi

# Long parameter lists (functions with >4 parameters)
LONG_PARAMS=$(grep -rn "function.*(" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | grep -E '\([^)]*,[^)]*,[^)]*,[^)]*,[^)]*\)' | wc -l | tr -d ' ')
print_result "$LONG_PARAMS" "Functions with >4 parameters" "warning"

echo ""
echo "5️⃣  Checking React-specific issues..."
echo "----------------------------------------"

# Inline styles (potential performance issue)
INLINE_STYLES=$(grep -rn "style={{" $ANALYZE_DIRS --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$INLINE_STYLES" "Inline style objects" "warning"

# Missing key props in lists
# Look for .map( followed by JSX without a key prop within the next few lines
MISSING_KEYS=0
for file in $(find $ANALYZE_DIRS -name "*.tsx" 2>/dev/null); do
    # Find .map( lines and check if key= appears in the next 3 lines
    while IFS= read -r line_num; do
        # Extract 3 lines after .map(
        CONTEXT=$(sed -n "${line_num},$((line_num + 3))p" "$file" 2>/dev/null | tr '\n' ' ')
        # Check if it contains JSX opening tag and no key=
        if echo "$CONTEXT" | grep -q "<[A-Z]" && ! echo "$CONTEXT" | grep -q "key="; then
            MISSING_KEYS=$((MISSING_KEYS + 1))
        fi
    done < <(grep -n "\.map(" "$file" 2>/dev/null | cut -d: -f1)
done
if [ "$MISSING_KEYS" -gt 0 ]; then
    print_result "$MISSING_KEYS" "Potential missing keys in lists (verify manually)" "warning"
else
    echo -e "${GREEN}✅ Potential missing keys in lists (verify manually): None found${NC}"
fi

# Direct DOM manipulation (should use refs)
DOM_MANIPULATION=$(grep -rn "document\.\|window\." $ANALYZE_DIRS --include="*.tsx" --exclude="*.test.*" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$DOM_MANIPULATION" "Direct DOM/window access" "warning"

echo ""
echo "6️⃣  Checking code duplication..."
echo "----------------------------------------"

# Duplicate imports (same import from same module multiple times in a file)
DUPLICATE_IMPORTS=0
for dir in $ANALYZE_DIRS; do
    if [ -d "$dir" ]; then
        COUNT=$(find $dir \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | while read file; do
            grep "^import.*from" "$file" 2>/dev/null | sort | uniq -d
        done | wc -l | tr -d ' ')
        DUPLICATE_IMPORTS=$((DUPLICATE_IMPORTS + COUNT))
    fi
done
print_result "$DUPLICATE_IMPORTS" "Duplicate imports" "warning"

# Magic numbers (hardcoded numbers that should be constants)
MAGIC_NUMBERS=$(grep -rn "[^a-zA-Z0-9_][0-9]\{2,\}[^a-zA-Z0-9_]" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" --exclude="*.test.*" $EXCLUDE_PATTERN 2>/dev/null | grep -v "px\|em\|rem\|ms\|s\|%" | wc -l | tr -d ' ')
print_result "$MAGIC_NUMBERS" "Potential magic numbers" "warning"

echo ""
echo "7️⃣  Checking security and best practices..."
echo "----------------------------------------"

# Dangerous innerHTML usage
DANGEROUS_HTML=$(grep -rn "dangerouslySetInnerHTML\|innerHTML" $ANALYZE_DIRS --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$DANGEROUS_HTML" "Dangerous HTML injection points" "critical"

# eval() usage
EVAL_USAGE=$(grep -rn "\beval(" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$EVAL_USAGE" "eval() usage" "critical"

# setTimeout with strings
SETTIMEOUT_STRING=$(grep -rn "setTimeout.*['\"]" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | wc -l | tr -d ' ')
print_result "$SETTIMEOUT_STRING" "setTimeout with string (use function)" "warning"

# Hardcoded secrets or API keys
POTENTIAL_SECRETS=$(grep -rin "api_key\|apikey\|secret\|password\|token" $ANALYZE_DIRS --include="*.ts" --include="*.tsx" $EXCLUDE_PATTERN 2>/dev/null | grep -v "interface\|type\|prop\|param" | wc -l | tr -d ' ')
print_result "$POTENTIAL_SECRETS" "Potential hardcoded secrets (review manually)" "critical"

echo ""
echo "8️⃣  Checking dependency issues..."
echo "----------------------------------------"

# Unused imports (simplified check)
UNUSED_IMPORTS=0
for dir in $ANALYZE_DIRS; do
    if [ -d "$dir" ]; then
        COUNT=$(grep -rn "^import.*from" $dir --include="*.ts" --include="*.tsx" 2>/dev/null | while read line; do
            file=$(echo "$line" | cut -d: -f1)
            import=$(echo "$line" | grep -o "import {[^}]*}" | sed 's/import {\|}\|,/ /g')
            for item in $import; do
                if ! grep -q "$item" "$file" 2>/dev/null; then
                    echo "$line"
                fi
            done
        done 2>/dev/null | wc -l | tr -d ' ')
        UNUSED_IMPORTS=$((UNUSED_IMPORTS + COUNT))
    fi
done
# Note: This is a basic check and may have false positives
if [ "$UNUSED_IMPORTS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Potential unused imports: $UNUSED_IMPORTS (verify with ESLint)${NC}"
fi

echo ""
echo "=================================================="
echo "📊 ANALYSIS SUMMARY"
echo "=================================================="
echo -e "${RED}Critical Issues: $CRITICAL_ISSUES${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "Total Issues Detected: $TOTAL_ISSUES"
echo ""

if [ "$CRITICAL_ISSUES" -gt 0 ]; then
    echo -e "${RED}❌ FAILED: Critical code smells detected!${NC}"
    echo "Please address critical issues before merging."
    exit 1
elif [ "$WARNINGS" -gt 10 ]; then
    echo -e "${YELLOW}⚠️  WARNING: Multiple code quality issues detected.${NC}"
    echo "Consider addressing warnings to improve code quality."
    exit 0
else
    echo -e "${GREEN}✅ PASSED: Code quality looks good!${NC}"
    exit 0
fi
