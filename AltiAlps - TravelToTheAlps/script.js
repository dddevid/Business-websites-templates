// Add at the beginning of the file
const logo = document.querySelector('.logo');
const hero = document.querySelector('.hero');

function updateLogoColor() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPosition = window.scrollY + 60; // 60px offset for navbar height
    
    if (scrollPosition < heroBottom) {
        logo.classList.add('over-hero');
    } else {
        logo.classList.remove('over-hero');
    }
}

window.addEventListener('scroll', updateLogoColor);
window.addEventListener('load', updateLogoColor);

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.location-card, .glass-section').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(element);
});

// Language translations
const translations = {
    en: {
        "hero-title": "Discover the Italian Alps",
        "hero-subtitle": "Join fellow adventurers in exploring the most beautiful peaks",
        "destinations-title": "Our Destinations",
        "cervino-desc": "Experience the majesty of the Matterhorn from the Italian side.",
        "bianco-desc": "Explore Europe's highest peak with experienced guides.",
        "rosa-desc": "Discover the stunning Monte Rosa massif and its glaciers.",
        "disclaimer-title": "Disclaimer",
        "disclaimer-text": "This website is a portfolio project and does not represent a real business. All content is fictional and created for demonstration purposes only.",
        "footer-desc": "Your gateway to Italian Alpine adventures",
        "quick-links": "Quick Links",
        "destinations": "Destinations",
        "disclaimer": "Disclaimer",
        "contact": "Contact"
    },
    it: {
        "hero-title": "Scopri le Alpi Italiane",
        "hero-subtitle": "Unisciti ad altri avventurieri nell'esplorazione delle vette più belle",
        "destinations-title": "Le Nostre Destinazioni",
        "cervino-desc": "Vivi la maestosità del Cervino dal versante italiano.",
        "bianco-desc": "Esplora la vetta più alta d'Europa con guide esperte.",
        "rosa-desc": "Scopri lo straordinario massiccio del Monte Rosa e i suoi ghiacciai.",
        "disclaimer-title": "Avviso",
        "disclaimer-text": "Questo sito web è un progetto portfolio e non rappresenta un'attività reale. Tutti i contenuti sono fittizi e creati solo a scopo dimostrativo.",
        "footer-desc": "La tua porta d'accesso alle avventure alpine italiane",
        "quick-links": "Link Rapidi",
        "destinations": "Destinazioni",
        "disclaimer": "Avviso",
        "contact": "Contatti"
    }
};

// Language switcher
const languageSelect = document.getElementById('languageSelect');

function updateLanguage(language) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
    document.documentElement.lang = language;
}

languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});
