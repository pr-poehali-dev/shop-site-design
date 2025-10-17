#!/bin/bash

echo "🚀 Starting YML parser..."
echo ""

# Check if node is available
if command -v node &> /dev/null; then
    echo "✓ Using Node.js"
    node scripts/run-parser.mjs
elif command -v bun &> /dev/null; then
    echo "✓ Using Bun"
    bun run scripts/fetch-products.ts
else
    echo "❌ Neither Node.js nor Bun found"
    echo ""
    echo "Please install one of:"
    echo "  - Node.js: https://nodejs.org/"
    echo "  - Bun: https://bun.sh/"
    echo ""
    echo "Or open scripts/quick-parse.html in your browser"
    exit 1
fi
