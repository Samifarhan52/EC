/**
 * THE EDU CONSULTANT - MAXIMALIST MOTION & SCROLL ENGINE
 * Controls Pop-In, Push-Left, Push-Right, Down-to-Up, Up-to-Down, 3D Magnetic Tilt & Page Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initPageTransitions();
  initMagneticCardTilt();
  initHeroWordRotation();
  initSeatCalculator();
  initModalTriggers();
});

/* ------------------------------------------------------------------------------
   1. SCROLL-DRIVEN ENTRY REVEAL ENGINE
   ------------------------------------------------------------------------------ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.anim-pop-in, .anim-pop-out, .anim-push-left, .anim-push-right, .anim-down-to-up, .anim-up-to-down'
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------------------------
   2. SMOOTH PAGE TRANSITIONS BETWEEN WEBSITES & SUBPAGES
   ------------------------------------------------------------------------------ */
function initPageTransitions() {
  // Create curtain if not already present
  let curtain = document.querySelector('.page-transition-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.className = 'page-transition-curtain';
    document.body.appendChild(curtain);
  }

  // Intercept links that navigate away
  const transitionLinks = document.querySelectorAll('a[data-transition], a.jumbo-switch-button, a.btn-header-brochure, a.portal-switch-pill');

  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me')) {
        e.preventDefault();
        curtain.classList.add('animating');
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      }
    });
  });
}

/* ------------------------------------------------------------------------------
   3. 3D MAGNETIC TILT INTERACTION
   ------------------------------------------------------------------------------ */
function initMagneticCardTilt() {
  const cards = document.querySelectorAll('.magnetic-card-tilt, .modern-college-card, .dest-feature-card, .hero-interactive-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 7;
      const rotateY = deltaX * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

/* ------------------------------------------------------------------------------
   4. DYNAMIC HERO WORD ROTATION
   ------------------------------------------------------------------------------ */
function initHeroWordRotation() {
  const wordEl = document.getElementById('heroRotatingWord');
  if (!wordEl) return;

  const colleges = [
    "RVCE Bangalore",
    "Christ University",
    "BMSCE Basavanagudi",
    "Ramaiah Institute (MSRIT)",
    "PES University",
    "Dayananda Sagar (DSCE)",
    "VIT Vellore"
  ];
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % colleges.length;
    wordEl.style.opacity = '0';
    wordEl.style.transform = 'translateY(15px) scale(0.95)';

    setTimeout(() => {
      wordEl.textContent = colleges[idx];
      wordEl.style.opacity = '1';
      wordEl.style.transform = 'translateY(0) scale(1)';
    }, 250);
  }, 2200);
}

/* ------------------------------------------------------------------------------
   5. INTERACTIVE SEAT & FEE CALCULATOR (HERO)
   ------------------------------------------------------------------------------ */
function initSeatCalculator() {
  const form = document.getElementById('heroSeatCalcForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="student_name"]')?.value || 'Student';
    const phone = form.querySelector('[name="student_phone"]')?.value || '';
    const stream = form.querySelector('[name="target_stream"]')?.value || 'Engineering B.Tech';
    const college = form.querySelector('[name="target_college"]')?.value || 'Top Autonomous Colleges';

    if (!phone || phone.length < 8) {
      alert('Please enter a valid WhatsApp phone number.');
      return;
    }

    const msg = encodeURIComponent(
      `Hi The Edu Consultant Team,\n\nI want to check confirmed 2027 seat availability and institutional fee matrix.\n\n👤 Name: ${name}\n📱 WhatsApp: ${phone}\n🎯 Stream: ${stream}\n🏛️ Target College: ${college}\n\nPlease share official admission guidance.`
    );

    window.open(`https://wa.me/919845371459?text=${msg}`, '_blank');
  });
}

/* ------------------------------------------------------------------------------
   6. MODAL TRIGGERS
   ------------------------------------------------------------------------------ */
function initModalTriggers() {
  window.openConsultModal = function(pref = '') {
    const modal = document.getElementById('leadModalOverlay');
    if (!modal) return;
    modal.classList.add('active');
    const input = document.getElementById('modalPrefInput');
    if (input && pref) input.value = pref;
  };

  window.closeConsultModal = function() {
    const modal = document.getElementById('leadModalOverlay');
    if (modal) modal.classList.remove('active');
  };
}
