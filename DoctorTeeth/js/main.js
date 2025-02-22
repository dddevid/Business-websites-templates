document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const languageSelect = document.getElementById('languageSelect');
    const icon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        icon.classList.toggle('fa-moon', savedTheme === 'light');
        icon.classList.toggle('fa-sun', savedTheme === 'dark');
    }

    // Theme Toggle with persistence
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
    });

    // Enhanced Language Switcher
    languageSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        
        // Update text content
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        // Update placeholders
        document.querySelectorAll(`[data-${lang}-placeholder]`).forEach(element => {
            element.placeholder = element.getAttribute(`data-${lang}-placeholder`);
        });

        // Update document language
        document.documentElement.lang = lang;

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    });

    // Load preferred language
    const preferredLanguage = localStorage.getItem('preferred-language') || 'en';
    languageSelect.value = preferredLanguage;
    languageSelect.dispatchEvent(new Event('change'));

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.parallax-section');
        sections.forEach(section => {
            const scroll = window.pageYOffset;
            const speed = 0.5;
            section.style.backgroundPositionY = `${scroll * speed}px`;
        });
    });

    // Purple tooth animation
    const tooth = document.querySelector('.tooth');
    if(tooth) {
        setInterval(() => {
            tooth.classList.add('purple-effect');
            setTimeout(() => {
                tooth.classList.remove('purple-effect');
            }, 2000);
        }, 4000);
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });

    setupReviewsCarousel();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Reviews Carousel
function setupReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const cards = Array.from(document.querySelectorAll('.review-card'));
    const prevBtn = document.querySelector('.review-nav.prev');
    const nextBtn = document.querySelector('.review-nav.next');
    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        cards.forEach((card, index) => {
            const position = ((index - currentIndex + cards.length) % cards.length);
            card.dataset.position = position === 0 ? 'center' : 
                                  position === 1 ? 'right' : 
                                  position === cards.length - 1 ? 'left' : 'hidden';
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 800); // Match transition duration
    }

    function moveCarousel(direction) {
        if (isTransitioning) return;
        currentIndex = (currentIndex + direction + cards.length) % cards.length;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));

    // Auto rotation with pause on hover
    let autoRotate = setInterval(() => moveCarousel(1), 5000);
    
    track.addEventListener('mouseenter', () => clearInterval(autoRotate));
    track.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => moveCarousel(1), 5000);
    });

    // Initial setup
    updateCarousel();
}
