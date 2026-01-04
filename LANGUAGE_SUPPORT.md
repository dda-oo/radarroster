# Language Support - English & German

## Overview
The RadarRoster website now supports both English and German languages with seamless switching between them.

## Features

### 1. Language Switcher
- Located in the navigation bar (both desktop and mobile)
- Two buttons: **EN** and **DE**
- Language preference is saved in browser's localStorage
- Persists across page refreshes and navigation

### 2. Translated Content

All major sections are available in both languages:

#### Navigation
- Menu items (Why Us, Services, Process, Projects, Newsletter)
- Call-to-action buttons

#### Homepage Sections
- **Hero Section**: Main headline, description, CTAs, and trust indicators
- **Value Proposition**: Title and description
- **Why Us**: Badge, titles, statistics, and benefits
- **Services**: All service cards with titles and descriptions
- **How We Work**: Process steps and timelines
- **Projects**: Project showcases and results
- **Contact Form**: All form fields, labels, and messages

#### Blog Page
- Navigation menu with language switcher
- All navigation items translated

### 3. Dynamic Form Messages
The contact form now displays success/error messages in the user's selected language:
- Validation errors
- Success confirmations
- Network error messages
- Captcha warnings

## How It Works

### File Structure
```
assets/js/
  ├── translations.js   # Contains all translations (EN & DE)
  └── main.js          # Updated with language-aware form handling
```

### Translation System
1. **translations.js**: Contains a `translations` object with English (`en`) and German (`de`) keys
2. **Data Attributes**: HTML elements use `data-i18n` attributes pointing to translation keys
3. **Language Functions**:
   - `setLanguage(lang)`: Switches to specified language
   - `updatePageContent()`: Updates all page text based on current language
   - `updateLanguageButtons()`: Highlights active language button

### Usage Examples

#### HTML Elements
```html
<!-- Navigation -->
<a href="#services" data-i18n="nav.services">Services</a>

<!-- Hero Section -->
<h1 data-i18n="hero.title">Transform Data into</h1>

<!-- Form Fields -->
<label data-i18n="contact.form.name">Your Name</label>
```

#### JavaScript
```javascript
// Get current language
const currentLang = localStorage.getItem('language') || 'en';

// Switch language
setLanguage('de'); // Switch to German
setLanguage('en'); // Switch to English

// Access translations
const t = translations[currentLang];
console.log(t.hero.title); // Get translated text
```

## Adding New Translations

To add translations for new content:

1. **Add to translations.js**:
```javascript
en: {
  newSection: {
    title: "New Section Title",
    description: "Section description"
  }
},
de: {
  newSection: {
    title: "Neuer Abschnittstitel",
    description: "Abschnittsbeschreibung"
  }
}
```

2. **Add data-i18n to HTML**:
```html
<h2 data-i18n="newSection.title">New Section Title</h2>
<p data-i18n="newSection.description">Section description</p>
```

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses localStorage API (supported by all browsers from IE 8+)
- Graceful fallback to English if translation missing

## Language Detection
- Default language: English (`en`)
- Checks localStorage for user preference
- Language persists across sessions
- Manual switching via UI buttons

## Notes
- Language preference is stored locally per browser
- Switching language updates all content immediately (no page reload)
- Form validation messages are also translated
- Klaro cookie consent is configured for German by default but can be extended
