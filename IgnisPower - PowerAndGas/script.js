// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .stagger-animation > *').forEach((el) => {
    observer.observe(el);
});

// Charts initialization (only on account page)
if (window.location.pathname.includes('account.html')) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Electricity usage chart
    const electricityCtx = document.getElementById('electricityChart').getContext('2d');
    new Chart(electricityCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'kWh Usage',
                data: [420, 450, 380, 410, 450, 420],
                borderColor: '#1a73e8',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gas usage chart
    const gasCtx = document.getElementById('gasChart').getContext('2d');
    new Chart(gasCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Therms Usage',
                data: [85, 90, 75, 70, 80, 85],
                borderColor: '#34a853',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
