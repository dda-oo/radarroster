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

// Calendly integration
const calendlyButton = document.getElementById('calendly-button');
if (calendlyButton) {
    calendlyButton.addEventListener('click', () => {
        Calendly.initPopupWidget({url: 'https://calendly.com/radarroster/30min'});
        return false;
    });
}

// Contact form submission with Web3Forms
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoader = document.getElementById('submit-loader');
    const submitIcon = document.getElementById('submit-icon');
    const formMessage = document.getElementById('form-message');
    
    // Set the access key directly
    const accessKeyInput = document.getElementById('web3forms_access_key');
    if (accessKeyInput) {
        accessKeyInput.value = 'fc055f0b-0423-454a-8625-57e197ca487c';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitButton.disabled = true;
            submitText.classList.add('hidden');
            submitLoader.classList.remove('hidden');
            submitIcon.classList.add('hidden');
            formMessage.classList.add('hidden');

            const formData = new FormData(contactForm);
            
            // Log form data for debugging
            console.log('Submitting form with data:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log('Web3Forms response:', data);

                if (data.success) {
                    // Success message
                    formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                    formMessage.classList.remove('hidden', 'text-red-400');
                    formMessage.classList.add('text-green-400');
                    contactForm.reset();
                    // Re-set the access key after reset
                    if (accessKeyInput) {
                        accessKeyInput.value = 'fc055f0b-0423-454a-8625-57e197ca487c';
                    }
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                // Error message
                formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email us directly at hello@radarroster.com';
                formMessage.classList.remove('hidden', 'text-green-400');
                formMessage.classList.add('text-red-400');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
                submitIcon.classList.remove('hidden');
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            const formData = new FormData(newsletterForm);
            formData.append('access_key', CONFIG.WEB3FORMS_ACCESS_KEY);
            formData.append('subject', 'New Newsletter Subscription');
            formData.append('from_name', 'RadarRoster Newsletter');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    submitButton.textContent = '✓ Subscribed!';
                    submitButton.classList.add('bg-green-600');
                    newsletterForm.reset();
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.classList.remove('bg-green-600');
                    }, 3000);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                submitButton.textContent = '✗ Error';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                }, 3000);
                console.error('Newsletter subscription error:', error);
            } finally {
                submitButton.disabled = false;
            }
        });
    }
});

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
