# Configuration Guide

## 🔧 Setting Up Your Website

### 1. Calendly Integration

**Step 1:** Sign up at [Calendly.com](https://calendly.com/)

**Step 2:** Create an event type (e.g., "30 Minute Strategy Call")

**Step 3:** Get your Calendly link (format: `https://calendly.com/your-username/30min`)

**Step 4:** Update `assets/js/main.js`:

```javascript
const calendlyUrl = 'https://calendly.com/your-username/30min'; // Replace with your link
```

### 2. Contact Form Setup

#### Option A: FormSpree (Recommended - Free & Easy)

**Step 1:** Sign up at [FormSpree.io](https://formspree.io/)

**Step 2:** Create a new form and get your form ID

**Step 3:** Update `assets/js/main.js`:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    // Replace YOUR_FORM_ID with your actual form ID
```

#### Option B: Netlify Forms (If hosting on Netlify)

**Step 1:** Add to your form in `index.html`:

```html
<form name="contact" method="POST" data-netlify="true">
```

**Step 2:** Netlify will automatically handle form submissions

#### Option C: Custom Backend

Create your own API endpoint and update the fetch URL in `main.js`.

### 3. Update Contact Information

In `index.html`, find the contact section and update:

```html
<span>contact@radarroster.com</span> <!-- Your email -->
<span>Germany / Global</span> <!-- Your location -->
```

### 4. Add Your Social Links

In `index.html` footer, update the social media links:

```html
<a href="https://github.com/your-username">GitHub</a>
<a href="https://linkedin.com/in/your-profile">LinkedIn</a>
```

### 5. Customize Content

#### Services
Edit the services section in `index.html` (search for `id="services"`).

#### Projects
Update project cards in `index.html` (search for `id="projects"`).

#### About
Modify the about section (search for `id="about"`).

### 6. Add Google Analytics (Optional)

Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 ID
</script>
```

## 📝 Adding New Pages

### Create a new page:

1. Copy `pages/blog.html` as a template
2. Update navigation links
3. Add your content
4. Link from main navigation in `index.html`

Example:
```bash
cp pages/blog.html pages/case-studies.html
# Edit case-studies.html with your content
```

## 🎨 Customization

### Colors
Edit in `<head>` of HTML files:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-blue': '#4A90E2',    // Primary color
                'dark-bg': '#0A0E27',        // Background
                'card-bg': '#141B3D',        // Card background
            }
        }
    }
}
```

### Fonts
Add in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

Then in `<style>`:

```css
body {
    font-family: 'Inter', sans-serif;
}
```

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Initial website setup"
git push origin main

# Enable GitHub Pages in repository settings
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📧 Testing Contact Form

1. Set up FormSpree or your backend
2. Submit a test message
3. Check your email for confirmation
4. Verify spam folder if needed

## ✅ Launch Checklist

- [ ] Update Calendly link
- [ ] Configure contact form
- [ ] Update email addresses
- [ ] Update social media links
- [ ] Test all forms
- [ ] Check mobile responsiveness
- [ ] Add Google Analytics (optional)
- [ ] Set up custom domain
- [ ] Test all pages and links
- [ ] Enable HTTPS
