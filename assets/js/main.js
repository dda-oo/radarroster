document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const calendlyButton = document.getElementById('calendly-button');
if (calendlyButton) {
    calendlyButton.addEventListener('click', () => {
        Calendly.initPopupWidget({url: 'https://calendly.com/radarroster/meeting'});
        return false;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoader = document.getElementById('submit-loader');
    const submitIcon = document.getElementById('submit-icon');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const hCaptchaResponse = contactForm.querySelector('textarea[name=h-captcha-response]')?.value;
            if (!hCaptchaResponse) {
                formMessage.textContent = '✗ Please complete the captcha verification';
                formMessage.classList.remove('hidden', 'text-green-400');
                formMessage.classList.add('text-red-400');
                return;
            }
            
            submitButton.disabled = true;
            submitText.textContent = 'Sending...';
            submitLoader.classList.remove('hidden');
            submitIcon.classList.add('hidden');
            formMessage.classList.add('hidden');

            const formData = new FormData(contactForm);
            
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
                console.log('Response status:', response.status);
                console.log('Response OK:', response.ok);

                if (response.ok) {
                    formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                    formMessage.classList.remove('hidden', 'text-red-400');
                    formMessage.classList.add('text-green-400');
                    contactForm.reset();
                } else {
                    const errorMsg = data.message || 'Unknown error occurred';
                    formMessage.textContent = '✗ Error: ' + errorMsg;
                    formMessage.classList.remove('hidden', 'text-green-400');
                    formMessage.classList.add('text-red-400');
                    console.error('Web3Forms API Error:', {
                        status: response.status,
                        statusText: response.statusText,
                        message: errorMsg,
                        fullResponse: data
                    });
                }
            } catch (error) {
                formMessage.textContent = '✗ Network error: ' + error.message + '. Please check your connection or email us at hello@radarroster.com';
                formMessage.classList.remove('hidden', 'text-green-400');
                formMessage.classList.add('text-red-400');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitText.textContent = 'Send Message';
                submitLoader.classList.add('hidden');
                submitIcon.classList.remove('hidden');
            }
        });
    }

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

console.log('RadarRoster - Page loaded:', window.location.pathname);
