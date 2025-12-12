// ============================================
// NAVIGATION
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ============================================
// CALENDLY INTEGRATION
// ============================================

const calendlyButton = document.getElementById('calendly-button');

if (calendlyButton) {
    calendlyButton.addEventListener('click', function() {
        // Your actual Calendly link
        const calendlyUrl = 'https://calendly.com/radarroster/meeting';
        
        // Open Calendly popup
        if (typeof Calendly !== 'undefined') {
            Calendly.initPopupWidget({
                url: calendlyUrl
            });
        } else {
            // Fallback: open in new tab if widget doesn't load
            window.open(calendlyUrl, '_blank');
        }
        return false;
    });
}

// ============================================
// CONTACT FORM with FormSubmit
// ============================================

const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submit-text');
const submitLoader = document.getElementById('submit-loader');
const submitIcon = document.getElementById('submit-icon');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not provided',
            message: formData.get('message'),
            _subject: 'New Contact Form Submission - RadarRoster',
            _captcha: 'false'
        };
        
        // Show loading state
        submitText.classList.add('hidden');
        submitIcon.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        
        try {
            // Using FormSubmit.co - REPLACE 'YOUR_EMAIL' with your actual email
            const response = await fetch('https://formsubmit.co/hello@radarroster.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Success
                formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                formMessage.className = 'text-green-400 text-center text-sm';
                formMessage.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Error
            formMessage.textContent = '✗ Failed to send message. Please email us directly at hello@radarroster.com';
            formMessage.className = 'text-red-400 text-center text-sm';
            formMessage.classList.remove('hidden');
            
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitText.classList.remove('hidden');
            submitIcon.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }
    });
}

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="email"]').value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        try {
            // Using FormSubmit.co for newsletter
            const response = await fetch('https://formsubmit.co/hello@radarroster.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    email, 
                    _subject: 'New Newsletter Subscription - RadarRoster',
                    _captcha: 'false'
                })
            });
            
            if (response.ok) {
                submitButton.textContent = '✓ Subscribed!';
                submitButton.classList.remove('bg-brand-blue');
                submitButton.classList.add('bg-green-600');
                this.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.classList.remove('bg-green-600');
                    submitButton.classList.add('bg-brand-blue');
                    submitButton.disabled = false;
                }, 3000);
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            submitButton.textContent = '✗ Try again';
            submitButton.classList.add('bg-red-600');
            console.error('Newsletter subscription error:', error);
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.classList.remove('bg-red-600');
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card-hover').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// UTILITIES
// ============================================

// Log page views (optional - for debugging)
console.log('RadarRoster - Page loaded:', window.location.pathname);
