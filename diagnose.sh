#!/bin/bash

: '
Contact Form Diagnostic Script
Comprehensive check of form configuration
'

echo "========================================="
echo "RadarRoster Contact Form Diagnostics"
echo "========================================="

echo ""
echo "1. Checking File Structure..."
echo "----------------------------"

if [ -f "index.html" ]; then
    echo "✓ index.html found"
else
    echo "✗ index.html MISSING"
fi

if [ -f "assets/js/config.js" ]; then
    echo "✓ config.js found"
else
    echo "✗ config.js MISSING - copy from config.example.js"
fi

if [ -f "assets/js/config.example.js" ]; then
    echo "✓ config.example.js found"
else
    echo "✗ config.example.js MISSING"
fi

if [ -f "assets/js/main.js" ]; then
    echo "✓ main.js found"
else
    echo "✗ main.js MISSING"
fi

echo ""
echo "2. Checking Configuration..."
echo "----------------------------"

if [ -f "assets/js/config.js" ]; then
    if grep -q "YOUR_ACCESS_KEY_HERE" assets/js/config.js; then
        echo "⚠ WARNING: Using placeholder access key"
        echo "  → Update config.js with your Web3Forms access key"
    else
        echo "✓ Access key appears to be configured"
    fi
fi

echo ""
echo "3. Checking Form Integration..."
echo "--------------------------------"

if [ -f "index.html" ]; then
    if grep -q "web3forms.com/submit" index.html; then
        echo "✓ Web3Forms action URL found"
    else
        echo "⚠ Web3Forms action URL missing"
    fi
    
    if grep -q "name=\"access_key\"" index.html; then
        echo "✓ Access key input field found"
    else
        echo "⚠ Access key field missing"
    fi
    
    if grep -q "botcheck" index.html; then
        echo "✓ Honeypot field found"
    else
        echo "⚠ Honeypot field missing"
    fi
fi

echo ""
echo "4. Checking Scripts..."
echo "----------------------"

if grep -q "web3forms.com/client/script.js" index.html 2>/dev/null; then
    echo "✓ Web3Forms client script loaded"
else
    echo "⚠ Web3Forms client script missing"
fi

if grep -q "assets/js/main.js" index.html 2>/dev/null; then
    echo "✓ main.js script loaded"
else
    echo "⚠ main.js script not loaded"
fi

echo ""
echo "========================================="
echo "Diagnostics Complete"
echo "========================================="
echo ""
echo "Next Steps:"
echo "1. Ensure config.js has your Web3Forms access key"
echo "2. Test the form at: http://localhost:8000"
echo "3. Check browser console for any errors"
echo ""
