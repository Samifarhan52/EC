/**
 * THE EDU CONSULTANT - FLAGSHIP MODERN CLIENT CONTROLLER
 * Beyond the Box UX | Interactive Seat Predictor | Dual Portal | 3D Tilt | 60fps Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroWordFlipper();
  initDualPortalSwitcher();
  initInteractiveSeatCalculator();
  initStatsCounterAnimation();
  initCollegeDirectoryFilters();
  init3DPerspectiveTilt();
  initFAQAccordion();
  initStickyHeader();
  initModalControllers();
});

/* ------------------------------------------------------------------------------
   1. HERO ROTATING WORD FLIPPER
   ------------------------------------------------------------------------------ */
function initHeroWordFlipper() {
  const flipTarget = document.getElementById('heroRotatingWord');
  if (!flipTarget) return;

  const words = [
    "RVCE Bangalore",
    "Christ University",
    "BMSCE Basavanagudi",
    "Ramaiah Institute",
    "United States (USA)",
    "United Kingdom (UK)",
    "Germany TU9"
  ];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    flipTarget.style.opacity = '0';
    flipTarget.style.transform = 'translateY(12px)';

    setTimeout(() => {
      flipTarget.textContent = words[currentIndex];
      flipTarget.style.opacity = '1';
      flipTarget.style.transform = 'translateY(0)';
    }, 250);
  }, 2400);
}

/* ------------------------------------------------------------------------------
   2. DUAL-PORTAL SWITCHER
   ------------------------------------------------------------------------------ */
function initDualPortalSwitcher() {
  window.switchPortalMode = function(mode) {
    const indiaButtons = document.querySelectorAll('[data-portal-btn="india"]');
    const abroadButtons = document.querySelectorAll('[data-portal-btn="abroad"]');
    const indiaSection = document.getElementById('portalViewIndia');
    const abroadSection = document.getElementById('portalViewAbroad');

    if (mode === 'abroad') {
      indiaButtons.forEach(b => b.classList.remove('active'));
      abroadButtons.forEach(b => b.classList.add('active'));

      if (abroadSection) {
        abroadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      abroadButtons.forEach(b => b.classList.remove('active'));
      indiaButtons.forEach(b => b.classList.add('active'));

      if (indiaSection) {
        indiaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
}

/* ------------------------------------------------------------------------------
   3. INTERACTIVE SEAT CALCULATOR WIDGET (HERO RIGHT CARD)
   ------------------------------------------------------------------------------ */
function initInteractiveSeatCalculator() {
  const form = document.getElementById('heroSeatCalcForm');
  const courseSelect = document.getElementById('calcCourseSelect');
  const liveBadge = document.getElementById('calcLiveBadge');

  if (courseSelect && liveBadge) {
    courseSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val.includes('Engineering')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> 14 Management Quota Seats Active';
        liveBadge.style.color = '#059669';
        liveBadge.style.background = '#ecfdf5';
      } else if (val.includes('MBA') || val.includes('Commerce')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Christ & Jain Quota Open 2027';
        liveBadge.style.color = '#2563eb';
        liveBadge.style.background = '#eff6ff';
      } else if (val.includes('Medical')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verified Institutional Allocation';
        liveBadge.style.color = '#7c3aed';
        liveBadge.style.background = '#faf5ff';
      } else if (val.includes('Abroad')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-plane-departure"></i> Fall 2027 Intakes Open • $30k Grants';
        liveBadge.style.color = '#d97706';
        liveBadge.style.background = '#fffbeb';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="student_name"]')?.value || 'Prospective Student';
      const phone = form.querySelector('[name="student_phone"]')?.value || '';
      const course = form.querySelector('[name="target_stream"]')?.value || 'Management Quota 2027';
      const college = form.querySelector('[name="target_college"]')?.value || 'Top Autonomous Colleges';

      if (!phone || phone.length < 8) {
        alert('Please enter a valid WhatsApp phone number.');
        return;
      }

      const msg = encodeURIComponent(
        `Hi The Edu Consultant Team,\n\nI want to check seat availability and fee matrix.\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n🎯 Stream: ${course}\n🏛️ Preferred College / Country: ${college}\n\nPlease share the official allotment guidance and fee structure.`
      );

      // Open WhatsApp Dispatch
      window.open(`https://wa.me/919845371459?text=${msg}`, '_blank');
      
      // Reset or show feedback
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Consultation Request Sent!';
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-bolt"></i> Check Seat Availability & Fees';
          btn.style.background = '';
        }, 4000);
      }
    });
  }
}

/* ------------------------------------------------------------------------------
   4. STATS COUNTER ANIMATION
   ------------------------------------------------------------------------------ */
function initStatsCounterAnimation() {
  const counters = document.querySelectorAll('.stats-number-val[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const start = performance.now();

        function countStep(time) {
          const progress = Math.min((time - start) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = target * easeProgress;

          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;

          if (progress < 1) {
            requestAnimationFrame(countStep);
          } else {
            el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString()) + suffix;
          }
        }

        requestAnimationFrame(countStep);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ------------------------------------------------------------------------------
   5. BANGALORE COLLEGES DIRECTORY FILTER TABS
   ------------------------------------------------------------------------------ */
function initCollegeDirectoryFilters() {
  const pills = document.querySelectorAll('.filter-tab-pill');
  const cards = document.querySelectorAll('.modern-college-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category?.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ------------------------------------------------------------------------------
   6. 3D CURSOR PERSPECTIVE TILT
   ------------------------------------------------------------------------------ */
function init3DPerspectiveTilt() {
  const tiltElements = document.querySelectorAll('.hero-interactive-card, .dest-feature-card, .pillar-item-card, .roadmap-step-card');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s ease';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

/* ------------------------------------------------------------------------------
   7. FAQ ACCORDION
   ------------------------------------------------------------------------------ */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-single-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ------------------------------------------------------------------------------
   8. STICKY HEADER SCROLL BEHAVIOR
   ------------------------------------------------------------------------------ */
function initStickyHeader() {
  const header = document.querySelector('.modern-site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ------------------------------------------------------------------------------
   9. MODAL CONTROLLERS & LEAD DISPATCH
   ------------------------------------------------------------------------------ */
function initModalControllers() {
  window.openConsultModal = function(preference = '') {
    const modal = document.getElementById('leadModalOverlay');
    if (!modal) return;
    modal.classList.add('active');

    const prefInput = document.getElementById('modalPrefInput');
    if (prefInput && preference) {
      prefInput.value = preference;
    }
  };

  window.closeConsultModal = function() {
    const modal = document.getElementById('leadModalOverlay');
    if (modal) modal.classList.remove('active');
  };

  const modalForm = document.getElementById('consultModalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalForm.querySelector('[name="name"]')?.value || 'Student';
      const phone = modalForm.querySelector('[name="phone"]')?.value || '';
      const course = modalForm.querySelector('[name="course"]')?.value || 'Admissions 2027';

      if (!phone || phone.length < 8) {
        alert('Please enter a valid WhatsApp phone number.');
        return;
      }

      const msg = encodeURIComponent(
        `Hi The Edu Consultant,\n\nI would like direct counseling assistance for Admissions 2027.\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n🎯 Course / Country: ${course}\n\nPlease get in touch with me.`
      );

      window.open(`https://wa.me/919845371459?text=${msg}`, '_blank');
      closeConsultModal();
    });
  }
}
