#!/bin/bash

echo "======================================"
echo "Web3Forms Integration Verification"
echo "======================================"
echo ""

# Check the form structure
echo "✓ Checking form attributes..."
if grep -q 'action="https://api.web3forms.com/submit"' index.html && grep -q 'method="POST"' index.html; then
    echo "  ✓ Form has correct action and method"
else
    echo "  ✗ Form missing action/method attributes"
fi

# Check access key
echo ""
echo "✓ Checking access key..."
if grep -q 'value="fc055f0b-0423-454a-8625-57e197ca487c"' index.html; then
    echo "  ✓ Access key is set in HTML"
else
    echo "  ✗ Access key not found in HTML"
fi

# Check response.ok usage
echo ""
echo "✓ Checking JavaScript implementation..."
if grep -q 'response.ok' assets/js/main.js; then
    echo "  ✓ Using response.ok check (correct)"
else
    echo "  ✗ Not using response.ok check"
fi

# Check required fields
echo ""
echo "✓ Checking form fields..."
fields=("name" "email" "message")
for field in "${fields[@]}"; do
    if grep -q "name=\"$field\"" index.html; then
        echo "  ✓ Field '$field' present"
    else
        echo "  ✗ Field '$field' missing"
    fi
done

# Check honeypot
echo ""
echo "✓ Checking spam protection..."
if grep -q 'name="botcheck"' index.html; then
    echo "  ✓ Honeypot field present"
else
    echo "  ✗ Honeypot field missing"
fi

echo ""
echo "======================================"
echo "IMPORTANT: Web3Forms Dashboard Setup"
echo "======================================"
echo ""
echo "1. Go to: https://web3forms.com/dashboard"
echo "2. Login to your account"
echo "3. Find access key: fc055f0b-0423-454a-8625-57e197ca487c"
echo "4. Configure:"
echo "   - Recipient Email: hello@radarroster.com"
echo "   - Verify the email (check inbox)"
echo "   - Add allowed domains (optional):"
echo "     • radarroster.com"
echo "     • www.radarroster.com"
echo ""
echo "======================================"
echo "Testing Instructions"
echo "======================================"
echo ""
echo "LOCAL TEST:"
echo "1. Server running at: http://localhost:8001"
echo "2. Open: http://localhost:8001/test-form.html"
echo "3. Fill and submit form"
echo "4. Check browser console (F12) for:"
echo "   - 'Response status: 200'"
echo "   - 'Response OK: true'"
echo ""
echo "PRODUCTION TEST:"
echo "1. Visit: https://radarroster.com/#contact"
echo "2. Open browser console (F12)"
echo "3. Submit test message"
echo "4. Check console for response"
echo "5. Check Web3Forms dashboard"
echo "6. Check hello@radarroster.com inbox"
echo ""
echo "======================================"
echo "Common Issues & Solutions"
echo "======================================"
echo ""
echo "If you get an error:"
echo ""
echo "1. Access key invalid:"
echo "   → Check Web3Forms dashboard"
echo "   → Make sure key is active"
echo ""
echo "2. Email not verified:"
echo "   → Check hello@radarroster.com inbox"
echo "   → Click verification link from Web3Forms"
echo ""
echo "3. Rate limit reached:"
echo "   → Wait a few minutes"
echo "   → Free plan: 250 submissions/month"
echo ""
echo "4. Domain restriction:"
echo "   → Add your domain in Web3Forms settings"
echo "   → Or remove domain restrictions"
echo ""
echo "5. Spam filter blocked:"
echo "   → Disable spam filter temporarily for testing"
echo "   → Re-enable after confirming it works"
echo ""
echo "======================================"
