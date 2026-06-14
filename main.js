/* ── Hamburger menu ── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('mobile-open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Scroll reveal with IntersectionObserver ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Lightbox ── */
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbCounter  = document.getElementById('lbCounter');
const lbClose    = document.getElementById('lbClose');
const lbPrev     = document.getElementById('lbPrev');
const lbNext     = document.getElementById('lbNext');

const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
let current = 0;

function openLightbox(index) {
    current = index;
    lbImg.src = galleryItems[current].src;
    lbCounter.textContent = `${current + 1} / ${galleryItems.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function showImage(index) {
    current = (index + galleryItems.length) % galleryItems.length;
    lbImg.classList.add('fade');
    setTimeout(() => {
        lbImg.src = galleryItems[current].src;
        lbCounter.textContent = `${current + 1} / ${galleryItems.length}`;
        lbImg.classList.remove('fade');
    }, 180);
}

galleryItems.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => showImage(current - 1));
lbNext.addEventListener('click', () => showImage(current + 1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
});

/* ── Hero parallax (subtle) ── */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
    }
}, { passive: true });
