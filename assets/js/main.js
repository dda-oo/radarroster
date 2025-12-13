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

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const messageDiv = form.querySelector('.newsletter-message') || createMessageDiv(form);
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage(messageDiv, '✗ Please enter your email address', 'error');
                return;
            }
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Subscribing...</span>';
            
            try {
                const response = await fetch('https://api.kit.com/v4/forms/8869562/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_key: 'yMJh-V-avmELNLpN8O2UvQ',
                        email: email
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showMessage(messageDiv, '✓ Success! Check your email to confirm your subscription.', 'success');
                    emailInput.value = '';
                } else {
                    showMessage(messageDiv, '✗ ' + (data.message || 'Subscription failed. Please try again.'), 'error');
                }
            } catch (error) {
                showMessage(messageDiv, '✗ Network error. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = form.classList.contains('blog-newsletter') 
                    ? '<span>Subscribe Now</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>'
                    : '<span>Subscribe</span>';
            }
        });
    });
    
    function createMessageDiv(form) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'newsletter-message mt-4 text-center text-sm hidden';
        form.appendChild(messageDiv);
        return messageDiv;
    }
    
    function showMessage(messageDiv, text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `newsletter-message mt-4 text-center text-sm ${type === 'success' ? 'text-green-400' : 'text-red-400'}`;
        
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
});

console.log('RadarRoster - Page loaded:', window.location.pathname);
