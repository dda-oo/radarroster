#!/bin/bash

echo "================================================"
echo "RadarRoster Contact Form Diagnostic Tool"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "1. Testing if Web3Forms API is accessible..."
if curl -s -o /dev/null -w "%{http_code}" https://api.web3forms.com/submit | grep -q "405"; then
    echo -e "${GREEN}✓ Web3Forms API is accessible${NC}"
else
    echo -e "${RED}✗ Cannot reach Web3Forms API${NC}"
fi

echo ""
echo "2. Checking if index.html has the contact form..."
if grep -q "contactForm" index.html; then
    echo -e "${GREEN}✓ Contact form found in index.html${NC}"
else
    echo -e "${RED}✗ Contact form not found${NC}"
fi

echo ""
echo "3. Checking if access key is set in main.js..."
if grep -q "fc055f0b-0423-454a-8625-57e197ca487c" assets/js/main.js; then
    echo -e "${GREEN}✓ Access key found in main.js${NC}"
else
    echo -e "${RED}✗ Access key not found${NC}"
fi

echo ""
echo "4. Checking for naming conflicts..."
if grep -A 20 "contactForm" index.html | grep -c 'name="email"' | grep -q "1"; then
    echo -e "${GREEN}✓ No email field naming conflicts${NC}"
else
    echo -e "${YELLOW}⚠ Multiple email fields detected - this may cause issues${NC}"
fi

echo ""
echo "5. Checking if honeypot is present..."
if grep -q "botcheck" index.html; then
    echo -e "${GREEN}✓ Honeypot field present${NC}"
else
    echo -e "${YELLOW}⚠ Honeypot field not found${NC}"
fi

echo ""
echo "================================================"
echo "Next Steps:"
echo "================================================"
echo ""
echo "1. Configure Web3Forms Dashboard:"
echo "   → Go to: https://web3forms.com/dashboard"
echo "   → Set recipient email to: hello@radarroster.com"
echo "   → Verify the email address"
echo ""
echo "2. Test locally:"
echo "   → Run: python3 -m http.server 8001"
echo "   → Open: http://localhost:8001"
echo "   → Fill and submit the contact form"
echo "   → Check browser console (F12) for errors"
echo ""
echo "3. Test on production:"
echo "   → Visit: https://radarroster.com"
echo "   → Submit test message"
echo "   → Check Web3Forms dashboard for submission"
echo "   → Check hello@radarroster.com inbox"
echo ""
echo "4. View form submissions:"
echo "   → Web3Forms dashboard: https://web3forms.com/dashboard"
echo "   → Look for recent submissions"
echo ""
echo "================================================"
