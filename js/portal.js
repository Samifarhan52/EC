/**
 * THE EDU CONSULTANT - DUAL PORTAL SWITCHER & FILTER ENGINE
 * Controls seamless switching between India Admissions and Study Abroad
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortalSwitcher();
  initCategoryFilters();
});

let currentPortal = 'india';

function initPortalSwitcher() {
  const portalBtns = document.querySelectorAll('[data-portal-target]');
  if (!portalBtns.length) return;

  // Check initial hash
  if (window.location.hash === '#abroad' || window.location.hash === '#study-abroad') {
    switchPortal('abroad');
  }

  portalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPortal = btn.getAttribute('data-portal-target');
      switchPortal(targetPortal);
    });
  });
}

function switchPortal(portalId) {
  if (portalId === currentPortal) return;
  currentPortal = portalId;

  // 1. Update button states
  document.querySelectorAll('[data-portal-target]').forEach((btn) => {
    if (btn.getAttribute('data-portal-target') === portalId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Cross-fade dynamic hero content
  const heroIndia = document.getElementById('hero-portal-india');
  const heroAbroad = document.getElementById('hero-portal-abroad');

  if (heroIndia && heroAbroad) {
    if (portalId === 'abroad') {
      heroIndia.style.display = 'none';
      heroAbroad.style.display = 'grid';
      window.history.replaceState(null, '', '#abroad');
    } else {
      heroAbroad.style.display = 'none';
      heroIndia.style.display = 'grid';
      window.history.replaceState(null, '', '#india');
    }
  }

  // 3. Update Consultation Modal default tab if open
  const modalTabIndia = document.getElementById('modal-tab-india');
  const modalTabAbroad = document.getElementById('modal-tab-abroad');
  if (modalTabIndia && modalTabAbroad) {
    if (portalId === 'abroad') {
      modalTabAbroad.click();
    } else {
      modalTabIndia.click();
    }
  }

  // 4. Smooth scroll hint if triggered manually from nav
  const showcaseTarget = portalId === 'abroad' ? document.getElementById('study-abroad-showcase') : document.getElementById('india-colleges-showcase');
  if (showcaseTarget && window.scrollY > 300) {
    showcaseTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Filter Pills Controller for College and Destination grids
 */
function initCategoryFilters() {
  // College Category Filters
  const collegeFilters = document.querySelectorAll('[data-college-filter]');
  const collegeCards = document.querySelectorAll('[data-college-category]');

  collegeFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      collegeFilters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-college-filter');

      collegeCards.forEach((card) => {
        const cat = card.getAttribute('data-college-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Study Abroad Destination Filters
  const destFilters = document.querySelectorAll('[data-dest-filter]');
  const destCards = document.querySelectorAll('[data-dest-region]');

  destFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      destFilters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-dest-filter');

      destCards.forEach((card) => {
        const reg = card.getAttribute('data-dest-region') || '';
        if (filter === 'all' || reg === filter) {
          card.style.display = 'flex';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
