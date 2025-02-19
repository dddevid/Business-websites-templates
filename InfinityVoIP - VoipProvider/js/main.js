/* js/main.js */

// DARK MODE WITH PERSISTENCE
const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggleBtn.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Back to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3D Draggable Testimonials Carousel using pointer events
const carousel = document.getElementById('testimonial-carousel');
const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
let currentSlide = slides.findIndex(slide => slide.classList.contains('active')) || 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
const threshold = 50; // pixels to trigger change

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove('prev', 'active', 'next');
    if (index === currentSlide) {
      slide.classList.add('active');
    } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (index === (currentSlide + 1) % slides.length) {
      slide.classList.add('next');
    }
  });
}

updateCarousel();

function dragStart(e) {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  currentX = startX;
  carousel.classList.add('grabbing');
}

function dragMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  currentX = e.clientX;
}

function dragEnd(e) {
  if (!isDragging) return;
  const diff = currentX - startX;
  if (diff > threshold) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  } else if (diff < -threshold) {
    currentSlide = (currentSlide + 1) % slides.length;
  }
  updateCarousel();
  isDragging = false;
  carousel.classList.remove('grabbing');
}

carousel.addEventListener('pointerdown', dragStart);
carousel.addEventListener('pointermove', dragMove);
carousel.addEventListener('pointerup', dragEnd);
carousel.addEventListener('pointercancel', dragEnd);
carousel.addEventListener('pointerleave', dragEnd);

// Auto-scroll carousel every 5 seconds if not dragging
setInterval(() => {
  if (!isDragging) {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }
}, 5000);

// Cart functionality: add product and save to localStorage
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const product = {
      title: this.getAttribute('data-title'),
      price: this.getAttribute('data-price'),
      img: this.getAttribute('data-img')
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
    window.location.href = this.getAttribute('href');
  });
});
