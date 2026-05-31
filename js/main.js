/* LocalSpot — Main JavaScript */
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://localspot-ngn1.onrender.com/api';

// Keep Render backend alive
setInterval(() => fetch(`${API_BASE}/health`).catch(() => {}), 10 * 60 * 1000);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (closeMenu) closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 140;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Active tab detection based on scroll (profile page)
const atabs = document.querySelectorAll('.atab');
if (atabs.length > 0) {
  const sections = ['about','products','videos','reviews','location'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 180) current = id;
    });
    atabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('href') === `#${current}`);
    });
  });
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

document.querySelectorAll('.shop-card, .cat-card, .step-card, .testi-card, .promo-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Dashboard sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const dashSidebar = document.getElementById('dashSidebar');
if (sidebarToggle && dashSidebar) {
  sidebarToggle.addEventListener('click', () => dashSidebar.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!dashSidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      dashSidebar.classList.remove('open');
    }
  });
}

console.log('LocalSpot loaded ✓');