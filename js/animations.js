/**
 * THE EDU CONSULTANT - UNIFIED ANIMATION & REVEAL CONTROLLER
 * 60fps Native IntersectionObserver | Number Counter | Card Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initAnimatedCounters();
  initCardTilt();
  initHeaderScroll();
});

/**
 * 1. IntersectionObserver for Staggered Scroll Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/**
 * 2. Animated Number Counters
 */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach((el) => counterObserver.observe(el));
}

function animateCounter(element, target, suffix) {
  let start = 0;
  const duration = 1800; // ms
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counterInterval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // Ease-out expo
    const current = Math.round(target * (1 - Math.pow(2, -10 * progress)));
    element.innerHTML = `${current.toLocaleString()}<span class="accent">${suffix}</span>`;

    if (frame >= totalFrames) {
      element.innerHTML = `${target.toLocaleString()}<span class="accent">${suffix}</span>`;
      clearInterval(counterInterval);
    }
  }, frameDuration);
}

/**
 * 3. 3D Card Tilt Effect on Mouse Move
 */
function initCardTilt() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
}

/**
 * 4. Header Shadow on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 5. Mobile Menu Drawer Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.querySelector('.main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.style.display === 'flex';
      if (isOpen) {
        mainNav.style.display = 'none';
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '74px';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.background = 'rgba(255, 255, 255, 0.98)';
        mainNav.style.padding = '1.5rem';
        mainNav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        mainNav.style.gap = '1.25rem';
        menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });
  }
});
