# Smart Chatbot - Client Customization Guide

## Overview
A configurable AI-style chatbot that can be trained on any website content. Perfect for offering as a service to clients.

## Features
✅ **No External APIs** - Pure JavaScript, no billing required
✅ **Smart Keyword Matching** - Understands user intent
✅ **Multi-language Support** - English & German (easily extendable)
✅ **Customizable Branding** - Colors, logo, position
✅ **Quick Actions** - Pre-defined helpful buttons
✅ **Typing Animations** - Natural conversation feel
✅ **Mobile Responsive** - Works on all devices
✅ **Zero Dependencies** - Works with Tailwind or standalone

## Installation

### 1. Add the Script
```html
<!-- Before closing </body> tag -->
<script src="assets/js/chatbot.js"></script>
```

### 2. Basic Setup (Uses Defaults)
The chatbot auto-initializes with default RadarRoster branding.

### 3. Custom Configuration
```javascript
// Override defaults after the script loads
window.radarChatbot = new SmartChatbot({
    brandName: 'Your Company',
    brandColor: '#FF6B6B',
    position: 'bottom-right', // or 'bottom-left'
    language: 'en', // or 'de'
    welcomeMessage: 'Hello! How can I help you today?',
    knowledgeBase: {
        // Add custom Q&A patterns
        'keyword1|keyword2|keyword3': {
            en: 'English response here',
            de: 'German response here'
        }
    }
});
```

## Customization for Clients

### Example 1: E-commerce Store
```javascript
window.radarChatbot = new SmartChatbot({
    brandName: 'ShopName',
    brandColor: '#E63946',
    welcomeMessage: 'Hi! Need help finding products?',
    knowledgeBase: {
        'shipping|delivery|send': {
            en: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.',
            de: 'Kostenloser Versand ab 50€. Lieferzeit 3-5 Werktage.'
        },
        'return|refund|exchange': {
            en: 'You can return items within 30 days for a full refund. No questions asked!',
            de: 'Rückgabe binnen 30 Tagen möglich. Volle Rückerstattung!'
        },
        'payment|pay|checkout': {
            en: 'We accept credit cards, PayPal, and bank transfers.',
            de: 'Wir akzeptieren Kreditkarten, PayPal und Überweisung.'
        }
    }
});
```

### Example 2: Restaurant
```javascript
window.radarChatbot = new SmartChatbot({
    brandName: 'Restaurant Name',
    brandColor: '#2A9D8F',
    welcomeMessage: 'Welcome! Ready to order?',
    knowledgeBase: {
        'menu|food|dishes|eat': {
            en: 'Our menu features Italian cuisine with fresh, local ingredients. Check out our menu page for the full selection!',
            de: 'Unsere Speisekarte bietet italienische Küche mit frischen, lokalen Zutaten.'
        },
        'hours|open|close|time': {
            en: 'We\'re open Mon-Sat: 11am-10pm, Sunday: 12pm-9pm',
            de: 'Öffnungszeiten: Mo-Sa 11-22 Uhr, So 12-21 Uhr'
        },
        'reservation|book|table': {
            en: 'You can reserve a table by calling us at (555) 123-4567 or using the reservation form on our website.',
            de: 'Reservierung telefonisch unter (555) 123-4567 oder über unser Online-Formular.'
        }
    }
});
```

### Example 3: SaaS Product
```javascript
window.radarChatbot = new SmartChatbot({
    brandName: 'ProductName',
    brandColor: '#4A90E2',
    welcomeMessage: 'Hi! Questions about our platform?',
    knowledgeBase: {
        'price|cost|plan|pricing': {
            en: 'We offer three plans:\n• Starter: $29/month\n• Pro: $79/month\n• Enterprise: Custom pricing\n\nAll plans include a 14-day free trial!',
            de: 'Preise: Starter 29€, Pro 79€, Enterprise individuell. 14 Tage kostenlos testen!'
        },
        'feature|functionality|what can': {
            en: 'Our platform offers:\n• Real-time analytics\n• Team collaboration\n• API integration\n• 24/7 support\n\nWould you like a demo?',
            de: 'Unsere Plattform bietet: Echtzeit-Analytics, Team-Collaboration, API-Integration und 24/7 Support.'
        },
        'trial|demo|test|try': {
            en: 'Start your free 14-day trial today! No credit card required. Click the "Get Started" button to begin.',
            de: '14 Tage kostenlos testen! Keine Kreditkarte erforderlich.'
        }
    }
});
```

## Training the Chatbot on New Content

### Step 1: Identify Key Topics
List the main topics your client's website covers:
- Products/Services
- Pricing
- Contact information
- Hours/Availability
- Common FAQs

### Step 2: Extract Keywords
For each topic, list relevant keywords users might search for:
- Topic: Shipping → Keywords: shipping, delivery, send, arrive, tracking
- Topic: Returns → Keywords: return, refund, exchange, warranty

### Step 3: Write Responses
Create clear, helpful responses for each topic in all supported languages.

### Step 4: Add to Knowledge Base
```javascript
knowledgeBase: {
    'keyword1|keyword2|keyword3': {
        en: 'English answer with details, links, or next steps',
        de: 'German translation'
    }
}
```

## Advanced Features

### Custom Styling
The chatbot uses Tailwind CSS classes. To customize:

1. Edit `chatbot.js` 
2. Find the `createChatWidget()` method
3. Modify CSS classes and inline styles

### Adding More Languages
```javascript
knowledgeBase: {
    'greeting|hello|hi': {
        en: 'Hello!',
        de: 'Hallo!',
        fr: 'Bonjour!',
        es: '¡Hola!'
    }
}
```

Then set: `language: 'fr'`

### Analytics Integration
Add tracking to `handleUserMessage()`:
```javascript
handleUserMessage(message) {
    // Track user queries
    gtag('event', 'chatbot_message', {
        'message': message
    });
    
    // ... rest of code
}
```

## Best Practices

1. **Keep responses concise** - 2-3 sentences max
2. **Use bullet points** - Easier to scan
3. **Include CTAs** - Direct users to forms, pages, or contact methods
4. **Test keywords** - Try variations of how users might ask
5. **Update regularly** - Add new Q&As based on actual questions
6. **Link to resources** - Point to detailed pages when needed

## Pricing as a Service

Suggested pricing tiers for offering this to clients:

- **Basic**: $299 - Chatbot setup with 10 Q&A topics
- **Pro**: $599 - Setup + 20 topics + custom branding
- **Enterprise**: $999+ - Setup + unlimited topics + analytics + ongoing training

Monthly maintenance: $49-$199/month for content updates

## Support

For questions about customizing this chatbot, contact:
- Email: hello@radarroster.com
- Website: radarroster.com

## License

© RadarRoster - Proprietary software for client projects
