/**
 * THE EDU CONSULTANT - BESPOKE CLIENT MOTION CONTROLLER
 * Bento Grid Calculations, 3D Tilt, Scroll Entry Reveals, and Instant WhatsApp Advisory
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initBentoCalculator();
  initBespokeFlipper();
  init3DCardTilt();
  initFAQAccordion();
  initModalControllers();
});

/* ------------------------------------------------------------------------------
   1. SCROLL ENTRY REVEAL ENGINE
   ------------------------------------------------------------------------------ */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.anim-pop-in, .anim-push-left, .anim-push-right, .anim-down-to-up, .anim-up-to-down'
  );

  if (!elements.length) return;

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

  elements.forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------------------------
   2. BENTO HERO WORD FLIPPER
   ------------------------------------------------------------------------------ */
function initBespokeFlipper() {
  const flipper = document.getElementById('heroRotatingWord');
  if (!flipper) return;

  const words = [
    "RVCE Bangalore",
    "Christ University",
    "BMSCE Basavanagudi",
    "Ramaiah Institute",
    "PES University",
    "Dayananda Sagar",
    "VIT Vellore"
  ];
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % words.length;
    flipper.style.opacity = '0';
    flipper.style.transform = 'translateY(12px) scale(0.95)';

    setTimeout(() => {
      flipper.textContent = words[idx];
      flipper.style.opacity = '1';
      flipper.style.transform = 'translateY(0) scale(1)';
    }, 250);
  }, 2200);
}

/* ------------------------------------------------------------------------------
   3. BENTO INTERACTIVE CALCULATOR (HERO CELL 2)
   ------------------------------------------------------------------------------ */
function initBentoCalculator() {
  const form = document.getElementById('bentoCalcForm');
  const streamSelect = document.getElementById('bentoStreamSelect');
  const liveBadge = document.getElementById('bentoLiveBadge');

  if (streamSelect && liveBadge) {
    streamSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val.includes('Engineering')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> 14 Quota Seats Active in RVCE &amp; BMSCE';
        liveBadge.style.background = '#ecfdf5';
        liveBadge.style.color = '#059669';
      } else if (val.includes('MBA') || val.includes('Commerce')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Christ &amp; Jain Management Quota Open';
        liveBadge.style.background = '#eff6ff';
        liveBadge.style.color = '#2563eb';
      } else if (val.includes('Medical')) {
        liveBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> NEET Direct Counseling Matrix Active';
        liveBadge.style.background = '#faf5ff';
        liveBadge.style.color = '#7c3aed';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Student';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const stream = form.querySelector('[name="stream"]')?.value || 'Engineering B.Tech';
      const college = form.querySelector('[name="college"]')?.value || 'Top Autonomous Colleges';

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
}

/* ------------------------------------------------------------------------------
   4. 3D MAGNETIC PERSPECTIVE TILT
   ------------------------------------------------------------------------------ */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll(
    '.bento-cell-spotlight, .bento-cell-calculator, .bento-cell-abroad-gateway, .flagship-institution-card, .pillar-item-card, .vault-preview-card'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      card.style.transform = `perspective(1000px) rotateX(${(-deltaY * 5).toFixed(2)}deg) rotateY(${(deltaX * 5).toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

/* ------------------------------------------------------------------------------
   5. FAQ ACCORDION
   ------------------------------------------------------------------------------ */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-single-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
}

/* ------------------------------------------------------------------------------
   6. MODAL CONTROLLER
   ------------------------------------------------------------------------------ */
function initModalControllers() {
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
