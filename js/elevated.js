/**
 * THE EDU CONSULTANT - MODERN ELEVATED CLIENT CONTROLLER
 * Dynamic Portal Switching, 3D Tilt, Counter Animations, and Study Abroad Lead Routing
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortalSwitcher();
  initStatsCounter();
  init3DCardTilt();
  initStudyAbroadModals();
});

/* ------------------------------------------------------------------------------
   1. DUAL PORTAL SWITCHER LOGIC
   ------------------------------------------------------------------------------ */
function initPortalSwitcher() {
  const urlHash = window.location.hash;
  if (urlHash === '#globalStudyAbroad' || urlHash === '#abroad') {
    switchPortalView('abroad');
  }

  // Bind hashchange
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#globalStudyAbroad') {
      switchPortalView('abroad');
    } else if (window.location.hash === '#heroSection' || window.location.hash === '#directorySection') {
      switchPortalView('india');
    }
  });
}

window.switchPortalView = function(portal) {
  const indiaBtn = document.getElementById('portalBtnIndia');
  const abroadBtn = document.getElementById('portalBtnAbroad');
  const heroIndiaPill = document.getElementById('heroPillIndia');
  const heroAbroadPill = document.getElementById('heroPillAbroad');

  if (portal === 'abroad') {
    if (indiaBtn) indiaBtn.classList.remove('active');
    if (abroadBtn) abroadBtn.classList.add('active');
    if (heroIndiaPill) heroIndiaPill.classList.remove('active');
    if (heroAbroadPill) heroAbroadPill.classList.add('active');

    const abroadSec = document.getElementById('globalStudyAbroad');
    if (abroadSec) {
      abroadSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    if (abroadBtn) abroadBtn.classList.remove('active');
    if (indiaBtn) indiaBtn.classList.add('active');
    if (heroAbroadPill) heroAbroadPill.classList.remove('active');
    if (heroIndiaPill) heroIndiaPill.classList.add('active');

    const indiaSec = document.getElementById('directorySection') || document.getElementById('heroSection');
    if (indiaSec) {
      indiaSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

/* ------------------------------------------------------------------------------
   2. STATS COUNTER ANIMATION (INTERSECTION OBSERVER)
   ------------------------------------------------------------------------------ */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-counter-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1800; // ms
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = target * easeProgress;

    el.textContent = prefix + (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString()) + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = prefix + (isDecimal ? target.toFixed(1) : target.toLocaleString()) + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

/* ------------------------------------------------------------------------------
   3. 3D CARD PERSPECTIVE TILT
   ------------------------------------------------------------------------------ */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('.dest-card-elevated, .test-prep-item-card, .service-item-one');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 6; // max 6 deg
      const rotateY = deltaX * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });
  });
}

/* ------------------------------------------------------------------------------
   4. STUDY ABROAD MODAL ROUTER
   ------------------------------------------------------------------------------ */
function initStudyAbroadModals() {
  window.openAbroadModal = function(destination) {
    if (typeof window.openRegisterModal === 'function') {
      window.openRegisterModal(destination);
    } else {
      const regModal = document.getElementById('registerModal');
      if (regModal) {
        regModal.classList.add('active');
        const collegeInput = document.getElementById('regTargetCollege') || document.querySelector('[name="college"]');
        if (collegeInput) collegeInput.value = destination;
      }
    }
  };
}
