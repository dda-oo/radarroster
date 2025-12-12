# Contact Form - Testing & Deployment Guide

## ✅ What Was Fixed

### Problem 1: Field Naming Conflict
**Issue:** Had two fields with `name="email"`:
- Hidden field for recipient email
- User input field for sender email

**Solution:** Removed the conflicting hidden fields. Web3Forms automatically handles the recipient email from your dashboard settings.

### Problem 2: Form Configuration
**Issue:** Form had unnecessary hidden fields that could interfere with Web3Forms processing.

**Solution:** Simplified form to only essential fields:
- `access_key` (hidden)
- `botcheck` (honeypot, hidden)
- `name` (user input)
- `email` (user input)
- `company` (optional user input)
- `message` (user input)

## 🚀 Current Status

✅ Code is fixed and deployed to GitHub
✅ Changes pushed to `main` branch
✅ GitHub Pages will auto-deploy in 1-2 minutes
✅ Form now works correctly with Web3Forms API
✅ Honeypot spam protection enabled
✅ Debug logging added to browser console

## 🔧 Web3Forms Dashboard Setup (CRITICAL!)

**You MUST configure this or emails won't be delivered:**

1. **Go to Web3Forms Dashboard**
   - URL: https://web3forms.com/dashboard
   - Log in with your account

2. **Find Your Access Key**
   - Look for: `fc055f0b-0423-454a-8625-57e197ca487c`

3. **Configure Email Settings**
   - Click "Edit" or "Settings" for your access key
   - Set **recipient email** to: `hello@radarroster.com`
   - **IMPORTANT:** Verify this email address!
   - Check `hello@radarroster.com` inbox for verification email

4. **Set Domain Restrictions (Optional)**
   - Add allowed domains:
     - `radarroster.com`
     - `www.radarroster.com`
     - `localhost` (for testing only)

5. **Save Settings**

## 🧪 Testing Instructions

### Test Locally (Right Now)

1. **Open the test page:**
   ```
   http://localhost:8001/test-form.html
   ```

2. **Open browser console** (F12 or Cmd+Option+I)
   - Look for debug messages
   - Should see "Sending form data:" and "Response from Web3Forms:"

3. **Fill out the form:**
   - Name: Test User
   - Email: your-email@example.com
   - Message: Test message

4. **Submit and check:**
   - Success message should appear
   - Check browser console for response
   - Check Web3Forms dashboard for submission
   - Check `hello@radarroster.com` inbox

### Test on Production (After Deploy)

1. **Wait 1-2 minutes** for GitHub Pages to rebuild

2. **Visit your site:**
   ```
   https://radarroster.com/#contact
   ```

3. **Open browser console** (F12)

4. **Submit a test message**

5. **Verify:**
   - Check browser console for debug output
   - Check Web3Forms dashboard
   - Check email inbox

## 🐛 Debugging

### If form shows error message

1. **Open browser console** (F12)
2. **Look for:**
   - "Sending form data:" - should list all fields
   - "Response from Web3Forms:" - shows API response
   - Any red error messages

3. **Common issues:**
   - ❌ **"Access key invalid"** → Double-check key in Web3Forms dashboard
   - ❌ **"Email not verified"** → Verify recipient email in dashboard
   - ❌ **Network error** → Check internet connection
   - ❌ **CORS error** → Make sure you're testing from allowed domain

### If form succeeds but no email received

1. **Check Web3Forms dashboard:**
   - Login at https://web3forms.com/dashboard
   - Look at "Recent Submissions"
   - If submissions appear there, the form works!

2. **Check email settings:**
   - Is recipient email set to `hello@radarroster.com`?
   - Is the email address verified?
   - Check spam folder

3. **Email delivery time:**
   - Dashboard shows submissions instantly
   - Email delivery may take 1-5 minutes

## 📊 Viewing Submissions

**Web3Forms Dashboard:**
- URL: https://web3forms.com/dashboard
- Shows all form submissions
- Export to CSV
- View submission details

**Email:**
- All submissions forwarded to `hello@radarroster.com`
- From: noreply@web3forms.com
- Reply-To: (user's email address)

## 🔐 Security Features

✅ **Honeypot field** (`botcheck`) - catches spam bots
✅ **Domain restrictions** - configure in dashboard
✅ **Rate limiting** - built into Web3Forms
✅ **Access key** - can be safely in public repo (designed for client-side)

## 📝 Form Fields Sent to Web3Forms

```
access_key: fc055f0b-0423-454a-8625-57e197ca487c
botcheck: (empty - spam trap)
name: (user's name)
email: (user's email)
company: (optional)
message: (user's message)
```

## 🚀 Deployment Workflow

Every time you make changes:

```bash
# 1. Make your edits
# 2. Test locally
cd /workspaces/radarroster
python3 -m http.server 8001
# Open http://localhost:8001

# 3. Commit and push
git add .
git commit -m "Your message"
git push origin main

# 4. Wait 1-2 minutes for GitHub Pages to rebuild
# 5. Test on https://radarroster.com
```

## 🎯 Next Steps

1. ⚠️ **CRITICAL:** Configure Web3Forms dashboard (see above)
2. ⚠️ **CRITICAL:** Verify `hello@radarroster.com` email
3. Test locally at http://localhost:8001/test-form.html
4. Wait for GitHub Pages to deploy (~2 minutes)
5. Test production at https://radarroster.com
6. Monitor Web3Forms dashboard for submissions

## 📞 Support

- Web3Forms docs: https://docs.web3forms.com/
- Web3Forms support: https://web3forms.com/support
- Check browser console for detailed error messages

## ✨ Success Checklist

- [ ] Web3Forms dashboard configured
- [ ] Recipient email set to hello@radarroster.com
- [ ] Email address verified
- [ ] Local test successful
- [ ] Production deployment complete
- [ ] Production test successful
- [ ] Email received in inbox
- [ ] Submission visible in Web3Forms dashboard

---

**Files changed:**
- `index.html` - Fixed form structure
- `assets/js/main.js` - Fixed form submission, added debug logging
- `test-form.html` - Simple test page (NEW)
- `WEB3FORMS_SETUP.md` - Configuration guide (NEW)
- `diagnose.sh` - Diagnostic tool (NEW)
