# RadarRoster - AI & Data Solutions

A modern, professional one-page consulting business website showcasing AI, data engineering, and cloud modernization services.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern Tech Stack**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Smooth Animations**: Scroll-based animations and hover effects
- **Contact Form**: Ready for backend integration
- **SEO Optimized**: Semantic HTML structure
- **Fast Loading**: Minimal dependencies, CDN-based

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
# Serve locally with Python
python3 -m http.server 8000

# Or with Node.js
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
- Contact: Form and CTA

## 📧 Contact Form Integration

The form currently shows an alert. To integrate with a backend:

```javascript
// Replace the alert in the form submission handler with:
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and `/` folder
4. Save

### Netlify
```bash
# Drop the entire folder in Netlify
# Or connect your Git repository
```

### Vercel
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

## License

© 2025 RadarRoster. All rights reserved.

## 🤝 Contributing

Built with care by dda-oo. Feel free to fork and customize for your needs!