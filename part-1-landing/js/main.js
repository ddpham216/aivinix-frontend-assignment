document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Background Effect on Scroll
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }, { passive: true });

    // 2. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';

            if (email && email.includes('@')) {
                alert('Thank you for subscribing to TIRAN updates!');
                if (emailInput) emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // 4. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const headerActions = document.querySelector('.header__actions');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('mobile-toggle--active');
            if (navMenu) navMenu.classList.toggle('nav--open');
            if (headerActions) headerActions.classList.toggle('header__actions--open');
        });
    }

    // Close mobile nav when clicking a nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains('mobile-toggle--active')) {
                mobileToggle.classList.remove('mobile-toggle--active');
                if (navMenu) navMenu.classList.remove('nav--open');
                if (headerActions) headerActions.classList.remove('header__actions--open');
            }
        });
    });
});
