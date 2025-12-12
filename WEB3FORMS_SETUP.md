# Web3Forms Configuration Guide

## Current Setup
- **Access Key:** `fc055f0b-0423-454a-8625-57e197ca487c`
- **Recipient Email:** `hello@radarroster.com`
- **Domain:** `radarroster.com`

## Step 1: Configure Access Key in Web3Forms Dashboard

1. Go to: https://web3forms.com/
2. Log in to your account
3. Find your access key: `fc055f0b-0423-454a-8625-57e197ca487c`
4. Click on "Configure" or "Settings" for this key

## Step 2: Set Recipient Email

In the Web3Forms dashboard, you MUST configure where messages should be sent:

1. Look for "Email Settings" or "Recipient Email"
2. Set it to: **hello@radarroster.com**
3. Save the settings

## Step 3: Configure Domain Restrictions (Optional but Recommended)

For security, add allowed domains:
- `radarroster.com`
- `www.radarroster.com`
- `localhost` (for testing - remove after testing)

**Note:** If you don't add `localhost`, local testing won't work until you deploy!

## Step 4: Email Verification

Web3Forms might require you to verify the recipient email address:
1. Check inbox at `hello@radarroster.com`
2. Click verification link from Web3Forms
3. Without verification, messages won't be delivered!

## Step 5: Test the Form

### Local Testing:
```bash
cd /workspaces/radarroster
python3 -m http.server 8001
# Open: http://localhost:8001/test-form.html
```

### Production Testing:
After deploying to `radarroster.com`, test the form there.

## Troubleshooting

### Issue: Form submits but no emails received
**Solution:** 
- Verify recipient email in Web3Forms dashboard
- Check spam folder in `hello@radarroster.com`
- Verify email address in Web3Forms dashboard

### Issue: "Access key invalid" error
**Solution:**
- Double-check the access key in dashboard
- Make sure the key is active

### Issue: Local testing doesn't work
**Solution:**
- Add `localhost` to allowed domains in Web3Forms dashboard
- OR test directly on your deployed site

### Issue: CORS errors in browser console
**Solution:**
- Check browser console (F12) for actual error
- Make sure you're not blocking third-party requests

## Viewing Submissions

1. Go to Web3Forms dashboard
2. Click on your access key
3. View "Recent Submissions" or "Inbox"
4. All form submissions will appear there
5. Emails will also be forwarded to `hello@radarroster.com`

## Important Notes

- Web3Forms sends emails FROM `noreply@web3forms.com`
- The reply-to will be set to the user's email
- Free plan has rate limits (250 submissions/month)
- Messages appear in dashboard immediately, email delivery may take 1-2 minutes

## Current Form Fields

The form sends these fields:
- `access_key` - Your Web3Forms key (hidden)
- `name` - User's name
- `email` - User's email (for reply-to)
- `company` - Optional company name
- `message` - User's message
- `botcheck` - Honeypot for spam protection

## Testing Checklist

- [ ] Access key is valid and active
- [ ] Recipient email configured in dashboard
- [ ] Recipient email verified
- [ ] Domain restrictions configured (if any)
- [ ] Test form submitted successfully
- [ ] Email received at hello@radarroster.com
- [ ] Submission appears in Web3Forms dashboard
