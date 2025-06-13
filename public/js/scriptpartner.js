document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Partnership tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const tabId = this.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Partner form submission
    const partnerForm = document.querySelector('.partner-form');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();

            // Scroll to top after submission
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Simple partners slider animation
    const partnersSlider = document.querySelector('.partners-slider');
    if (partnersSlider) {
        let scrollAmount = 0;
        const scrollStep = 1;
        const scrollDelay = 30;

        function autoScroll() {
            partnersSlider.scrollLeft += scrollStep;
            scrollAmount += scrollStep;

            // Reset to start if reached end
            if (scrollAmount >= partnersSlider.scrollWidth - partnersSlider.clientWidth) {
                partnersSlider.scrollLeft = 0;
                scrollAmount = 0;
            }

            setTimeout(autoScroll, scrollDelay);
        }

        // Pause on hover
        partnersSlider.addEventListener('mouseenter', () => {
            clearTimeout(autoScroll);
        });

        partnersSlider.addEventListener('mouseleave', autoScroll);

        // Start auto-scroll
        autoScroll();
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .tab-content-inner, .partner-form');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.benefit-card, .tab-content-inner, .partner-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load for elements in view
});