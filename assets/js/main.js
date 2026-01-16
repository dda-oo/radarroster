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
                const lang = localStorage.getItem('language') || 'en';
                formMessage.textContent = '✗ ' + translations[lang].contact.form.captchaError;
                formMessage.classList.remove('hidden', 'text-green-400');
                formMessage.classList.add('text-red-400');
                return;
            }
            
            const lang = localStorage.getItem('language') || 'en';
            submitButton.disabled = true;
            submitText.textContent = translations[lang].contact.form.sending;
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
                    formMessage.textContent = '✓ ' + translations[lang].contact.form.success;
                    formMessage.classList.remove('hidden', 'text-red-400');
                    formMessage.classList.add('text-green-400');
                    contactForm.reset();
                } else {
                    const errorMsg = data.message || 'Unknown error occurred';
                    formMessage.textContent = '✗ ' + translations[lang].contact.form.error + ' ' + errorMsg;
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
                formMessage.textContent = '✗ ' + translations[lang].contact.form.networkError + ' ' + error.message + '. ' + translations[lang].contact.form.checkConnection;
                formMessage.classList.remove('hidden', 'text-green-400');
                formMessage.classList.add('text-red-400');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitText.textContent = translations[lang].contact.form.submit;
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

console.log('RadarRoster - Page loaded:', window.location.pathname);

