/**
 * THE EDU CONSULTANT - UNIFIED LEAD MODAL & WHATSAPP ROUTING ENGINE
 * Handles modal triggers, field validation, and direct WhatsApp dispatch
 */

const WHATSAPP_PHONE = '919845371459'; // Official Verified Desk

document.addEventListener('DOMContentLoaded', () => {
  initLeadModal();
  initFormSubmissions();
});

function initLeadModal() {
  const modal = document.getElementById('consultation-modal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-open-modal]');
  const closeBtns = modal.querySelectorAll('[data-close-modal], .modal-close-btn');

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preference = btn.getAttribute('data-preference') || 'India';
      const targetEntity = btn.getAttribute('data-target') || '';

      // Set target field if exists
      const targetInput = document.getElementById('modal-target-input');
      if (targetInput && targetEntity) {
        targetInput.value = targetEntity;
      }

      // Switch modal tab
      if (preference.toLowerCase().includes('abroad')) {
        const abroadTab = document.getElementById('modal-tab-abroad');
        if (abroadTab) abroadTab.click();
      } else {
        const indiaTab = document.getElementById('modal-tab-india');
        if (indiaTab) indiaTab.click();
      }

      openModal(modal);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(modal));
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });

  // Modal Portal Tabs Switcher
  const tabIndia = document.getElementById('modal-tab-india');
  const tabAbroad = document.getElementById('modal-tab-abroad');
  const streamDropdownWrap = document.getElementById('modal-stream-wrap');
  const countryDropdownWrap = document.getElementById('modal-country-wrap');

  if (tabIndia && tabAbroad) {
    tabIndia.addEventListener('click', () => {
      tabIndia.classList.add('active');
      tabAbroad.classList.remove('active');
      if (streamDropdownWrap) streamDropdownWrap.style.display = 'block';
      if (countryDropdownWrap) countryDropdownWrap.style.display = 'none';
      document.getElementById('modal-lead-type').value = 'India Admissions';
    });

    tabAbroad.addEventListener('click', () => {
      tabAbroad.classList.add('active');
      tabIndia.classList.remove('active');
      if (streamDropdownWrap) streamDropdownWrap.style.display = 'none';
      if (countryDropdownWrap) countryDropdownWrap.style.display = 'block';
      document.getElementById('modal-lead-type').value = 'Study Abroad';
    });
  }
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Direct WhatsApp Lead Dispatch
 */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-lead-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (form.querySelector('[name="name"]')?.value || '').trim();
      const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
      const email = (form.querySelector('[name="email"]')?.value || '').trim();
      const leadType = form.querySelector('[name="lead_type"]')?.value || 'Admissions Enquiry';
      const selection = form.querySelector('[name="course_or_country"]')?.value || 'General Consultation';

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      // Format WhatsApp Message
      const message = 
`*NEW ADMISSION ENQUIRY - THE EDU CONSULTANT*
---------------------------------------
👤 *Student Name:* ${name}
📞 *Phone Number:* ${phone}
📧 *Email:* ${email || 'Not Provided'}
🎯 *Vertical:* ${leadType}
📚 *Target Choice:* ${selection}
🌐 *Source:* Web Portal (theeduconsultant.com)
---------------------------------------
_Looking for immediate admission guidance & fee details._`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');

      // Visual success state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Connected to WhatsApp!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          const modal = document.getElementById('consultation-modal');
          if (modal) closeModal(modal);
          form.reset();
        }, 3000);
      }
    });
  });
}
