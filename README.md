# RadarRoster - AI & Data Solutions

A modern, professional one-page consulting business website showcasing AI, data engineering, and cloud modernization services.

🌐 **Live Site:** https://radarroster.com

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern Tech Stack**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Smooth Animations**: Scroll-based animations and hover effects
- **Functional Contact Form**: Web3Forms integration with hCaptcha spam protection
- **SEO Optimized**: Semantic HTML structure
- **Fast Loading**: Minimal dependencies, CDN-based
- **GitHub Pages**: Auto-deploys on push to main branch

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- No build process required

## 📦 Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. That's it! No installation needed.

For development:
```bash
python3 -m http.server 8000
```

Or with Node.js:
```bash
npx serve .
```

Then visit `http://localhost:8000`

## 🎨 Customization

### Colors
Edit the Tailwind config in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-blue': '#4A90E2',
                'dark-bg': '#0A0E27',
                'card-bg': '#141B3D',
            }
        }
    }
}
```

### Content
All content is in `index.html`. Update text directly in the HTML.

### Sections
- Hero: Main landing section
- Services: Core offerings
- Projects: Portfolio showcase
- About: Trust and company info
- Contact: Form with Web3Forms integration

## 📧 Contact Form

The contact form is fully functional using **Web3Forms** with **hCaptcha** spam protection.

### Features:
- ✅ Sends emails to: `hello@radarroster.com`
- ✅ hCaptcha spam protection
- ✅ Honeypot field for bot detection
- ✅ Client-side validation
- ✅ Success/error feedback

### Setup Guides:
- **Contact Form Setup:** [CONTACT_FORM_GUIDE.md](CONTACT_FORM_GUIDE.md)
- **Web3Forms Configuration:** [WEB3FORMS_SETUP.md](WEB3FORMS_SETUP.md)
- **hCaptcha Setup:** [HCAPTCHA_SETUP.md](HCAPTCHA_SETUP.md)

### Testing:
Run diagnostic:
```bash
./diagnose.sh
```

Verify form setup:
```bash
./verify-form.sh
```

Test locally:
```bash
python3 -m http.server 8001
```
Visit: http://localhost:8001/test-debug.html

## 🚀 Deployment

This site is configured for **GitHub Pages** with custom domain: **radarroster.com**

### Automatic Deployment
Every push to `main` branch automatically deploys to production.

```bash
git add .
git commit -m "Your changes"
git push origin main
```
Wait 1-2 minutes for GitHub Pages to rebuild.

### Manual Deployment Script
```bash
./deploy.sh
```

### Other Platforms

**Netlify:**
Drop the entire folder in Netlify or connect your Git repository.

**Vercel:**
```bash
vercel --prod
```

# RadarRoster

AI & Data Intelligence Solutions

## Setup

1. Clone the repository
2. Copy the config example file:
   ```bash
   cp assets/js/config.example.js assets/js/config.js
   ```
3. Add your Web3Forms access key to `assets/js/config.js`
4. Open `index.html` in your browser

## Contact Form

The contact form uses [Web3Forms](https://web3forms.com/) for message delivery. Messages are sent to `hello@radarroster.com`.

The form includes:
- Honeypot spam protection
- Client-side validation
- Success/error feedback
- Secure access key handling (gitignored)

## Security

- The `assets/js/config.js` file is gitignored to keep the access key private
- Use `config.example.js` as a template
- Web3Forms access keys can be regenerated anytime from your dashboard

## 📄 License

© 2025 RadarRoster (dda-oo). Licensed under [Creative Commons Attribution-NonCommercial 4.0 International](LICENSE).

**You are free to:**
- View, learn from, and fork this project
- Adapt and build upon it for personal or educational use

**Under these terms:**
- **Attribution Required**: Credit RadarRoster (dda-oo) with a link to this repository
- **NonCommercial**: No commercial use without written permission

See [LICENSE](LICENSE) file for full terms.

---

Built with excellence by [dda-oo](https://github.com/dda-oo) • [RadarRoster](https://radarroster.com)