/**
 * AIDW 2026 — Tangram Interactive Engine
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Definitions
  const SCHEDULE_DATA = [
    { day: "DAY 01", date: "02 NOV", time: "10:00", title: "Opening Keynote: Designing Possibilities", type: "TALKS", venue: "Main Auditorium" },
    { day: "DAY 01", date: "02 NOV", time: "13:30", title: "Material Futures: Hands-on Lab", type: "WORKSHOPS", venue: "Material Studio" },
    { day: "DAY 01", date: "02 NOV", time: "18:00", title: "Opening Exhibition Walkthrough", type: "EXHIBITIONS", venue: "Design Pavilion" },
    { day: "DAY 02", date: "03 NOV", time: "11:00", title: "Creative Agents & New Authorship", type: "TALKS", venue: "Black Box Theatre" },
    { day: "DAY 02", date: "03 NOV", time: "14:00", title: "Tangram Futures Challenge", type: "COMPETITIONS", venue: "Innovation Courtyard" },
    { day: "DAY 03", date: "04 NOV", time: "10:30", title: "Pedagogy Beyond the Classroom", type: "WORKSHOPS", venue: "Learning Commons" },
    { day: "DAY 03", date: "04 NOV", time: "15:00", title: "Designing for Collective Impact", type: "TALKS", venue: "Main Auditorium" },
    { day: "DAY 04", date: "05 NOV", time: "11:30", title: "Design for the Gig Economy", type: "TALKS", venue: "Black Box Theatre" },
    { day: "DAY 04", date: "05 NOV", time: "19:30", title: "The Garment as Architecture", type: "FASHION", venue: "Design Pavilion" },
    { day: "DAY 05", date: "06 NOV", time: "12:00", title: "Future Forms Exhibition", type: "EXHIBITIONS", venue: "Design Pavilion" },
    { day: "DAY 05", date: "06 NOV", time: "17:00", title: "Closing Night / Open Studio", type: "EXHIBITIONS", venue: "Central Quad" },
  ];

  const SCATTER_TRANSFORMS = [
    { id: 'tangram-group-yellow', x: 20, y: -40, rotate: 18, scale: 0.42 },
    { id: 'tangram-group-blue', x: 130, y: 40, rotate: -44, scale: 0.65 },
    { id: 'tangram-group-purple', x: 170, y: 60, rotate: 83, scale: 0.75 },
    { id: 'tangram-group-red', x: -90, y: 20, rotate: -77, scale: 0.48 },
    { id: 'tangram-group-pink', x: 90, y: -20, rotate: 23, scale: 0.58 },
    { id: 'tangram-group-orange', x: -10, y: 90, rotate: 43, scale: 0.6 },
    { id: 'tangram-group-green', x: 20, y: 120, rotate: -26, scale: 0.65 },
  ];

  const SHAPE_DEFS = {
    triangle: "0,0 100,100 0,100",
    wedge: "0,0 100,50 0,100",
    square: "0,0 100,0 100,100 0,100",
    parallelogram: "25,0 100,0 75,100 0,100",
    diamond: "50,0 100,50 50,100 0,50",
  };

  const ORIGAMI_FACETS = [
    { shape: "wedge", x: 280, y: 35, rotate: 0, color: "#FF2414", opacity: 0.94 },
    { shape: "triangle", x: 215, y: 148, rotate: -90, color: "#FF3B00", opacity: 0.9 },
    { shape: "square", x: 325, y: 165, rotate: 0, color: "#003C5B", opacity: 0.84 },
    { shape: "triangle", x: 354, y: 220, rotate: 0, color: "#11B9E8", opacity: 0.86 },
    { shape: "triangle", x: 405, y: 188, rotate: -90, color: "#2459D9", opacity: 0.78 },
    { shape: "parallelogram", x: 486, y: 134, rotate: -18, color: "#FF48B5", opacity: 0.86 },
    { shape: "triangle", x: 482, y: 216, rotate: 90, color: "#5DCE8D", opacity: 0.76 },
    { shape: "square", x: 580, y: 202, rotate: 0, color: "#FFE100", opacity: 0.98 },
    { shape: "triangle", x: 144, y: 267, rotate: 0, color: "#9B5DD8", opacity: 0.8 },
    { shape: "triangle", x: 207, y: 277, rotate: -90, color: "#16C5E4", opacity: 0.82 },
    { shape: "square", x: 330, y: 278, rotate: 0, color: "#00B84E", opacity: 0.78 },
    { shape: "square", x: 410, y: 278, rotate: 0, color: "#FFDF00", opacity: 0.92 },
    { shape: "triangle", x: 444, y: 244, rotate: -90, color: "#2F239C", opacity: 0.74 },
    { shape: "square", x: 500, y: 284, rotate: 0, color: "#FF8A00", opacity: 0.78 },
    { shape: "triangle", x: 542, y: 264, rotate: -90, color: "#FFE100", opacity: 0.96 },
    { shape: "square", x: 635, y: 250, rotate: 0, color: "#FFE100", opacity: 0.98 },
    { shape: "square", x: 250, y: 350, rotate: 0, color: "#F80086", opacity: 0.82 },
    { shape: "square", x: 350, y: 364, rotate: 0, color: "#55106F", opacity: 0.72 },
    { shape: "triangle", x: 420, y: 328, rotate: 0, color: "#FF5A79", opacity: 0.78 },
    { shape: "triangle", x: 480, y: 332, rotate: -90, color: "#00A94E", opacity: 0.72 },
    { shape: "triangle", x: 526, y: 300, rotate: 0, color: "#15BEEA", opacity: 0.86 },
    { shape: "square", x: 418, y: 430, rotate: 0, color: "#009A45", opacity: 0.78 },
    { shape: "triangle", x: 505, y: 418, rotate: 0, color: "#FF3140", opacity: 0.84 },
    { shape: "square", x: 330, y: 470, rotate: 0, color: "#FF5A00", opacity: 0.8 },
    { shape: "triangle", x: 220, y: 478, rotate: -90, color: "#1953C8", opacity: 0.82 },
    { shape: "diamond", x: 390, y: 500, rotate: 0, color: "#00A94F", opacity: 0.8 },
    { shape: "triangle", x: 360, y: 558, rotate: 45, color: "#FFE000", opacity: 0.96 },
    { shape: "triangle", x: 150, y: 540, rotate: 0, color: "#13C3E6", opacity: 0.9 },
  ];

  // 2. Custom Difference Cursor
  const cursor = document.getElementById('custom-cursor');
  document.addEventListener('pointermove', (e) => {
    if (!cursor) return;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    const hoverTarget = e.target.closest('[data-cursor-label]');
    if (hoverTarget) {
      cursor.textContent = hoverTarget.getAttribute('data-cursor-label') || '';
      cursor.classList.add('cursor-active');
    } else {
      cursor.textContent = '';
      cursor.classList.remove('cursor-active');
    }
  });

  // 3. Site Nav Scroll State
  const siteNav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      siteNav.classList.add('site-nav-scrolled');
    } else {
      siteNav.classList.remove('site-nav-scrolled');
    }
  }, { passive: true });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
  }

  // 5. Interactive Origami Tangram Sculpture
  const tangramArt = document.getElementById('tangram-art');
  const foldStateText = document.getElementById('fold-state-text');
  const foldDescText = document.getElementById('fold-desc-text');
  const origamiFacetsLayer = document.getElementById('origami-facets-layer');
  let isFolded = false;

  // Build origami micro-facets dynamically into SVG
  if (origamiFacetsLayer) {
    ORIGAMI_FACETS.forEach((facet, index) => {
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('class', 'origami-art-facet');
      polygon.setAttribute('points', SHAPE_DEFS[facet.shape]);
      polygon.setAttribute('fill', facet.color);
      polygon.setAttribute('stroke', '#F7F5EF');
      polygon.setAttribute('stroke-width', '1');
      polygon.style.opacity = '0';
      polygon.style.transform = `translate(350px, 310px) scale(0)`;
      polygon.dataset.index = index;
      origamiFacetsLayer.appendChild(polygon);
    });
  }

 function setFoldState(folded) {
  isFolded = folded;

  if (folded) {
    tangramArt.classList.add('is-folded');
    foldStateText.textContent = 'ORIGAMI FORM';
    foldDescText.textContent = 'CAMERA / OUT';

    // Scatter 7 primary tangram pieces
    SCATTER_TRANSFORMS.forEach(t => {
      const el = document.getElementById(t.id);

      if (el) {
        el.style.transform =
          `translate(${150 + t.x}px, ${110 + t.y}px) rotate(${t.rotate}deg) scale(${t.scale})`;
      }
    });

    // Explode micro-facets
    if (origamiFacetsLayer) {
      const facetEls =
        origamiFacetsLayer.querySelectorAll('.origami-art-facet');

      facetEls.forEach((el, i) => {
        const f = ORIGAMI_FACETS[i];

        el.style.transform =
          `translate(${f.x}px, ${f.y}px) rotate(${f.rotate}deg) scale(0.85)`;

        el.style.opacity = String(f.opacity);
      });
    }

  } else {
    tangramArt.classList.remove('is-folded');
    foldStateText.textContent = 'HOVER TO FOLD';
    foldDescText.textContent = '7 CONTINUOUS PIECES';

    // Reassemble 7 primary pieces into neat square
    SCATTER_TRANSFORMS.forEach(t => {
      const el = document.getElementById(t.id);

      if (el) {
        el.style.transform =
          `translate(150px, 110px) rotate(0deg) scale(1)`;
      }
    });

    // Retract micro-facets
    if (origamiFacetsLayer) {
      const facetEls =
        origamiFacetsLayer.querySelectorAll('.origami-art-facet');

      facetEls.forEach(el => {
        el.style.transform =
          `translate(350px, 310px) scale(0)`;

        el.style.opacity = '0';
      });
    }
  }
}

if (tangramArt) {
  tangramArt.addEventListener('mouseenter', () => setFoldState(true));
  tangramArt.addEventListener('mouseleave', () => setFoldState(false));
  tangramArt.addEventListener('focus', () => setFoldState(true));
  tangramArt.addEventListener('blur', () => setFoldState(false));
  tangramArt.addEventListener('click', () => setFoldState(!isFolded));
}

  // 6. Interactive Timetable / Schedule Filter
  let currentDay = 'DAY 01';
  let currentFilter = 'ALL';
  const scheduleList = document.getElementById('schedule-list');
  const dayTabs = document.getElementById('day-tabs');
  const filterTabs = document.getElementById('filter-tabs');

  function renderSchedule() {
    if (!scheduleList) return;
    const matches = SCHEDULE_DATA.filter(item => {
      const dayMatch = item.day === currentDay;
      const typeMatch = currentFilter === 'ALL' || item.type === currentFilter;
      return dayMatch && typeMatch;
    });

    if (matches.length === 0) {
      scheduleList.innerHTML = `<div class="schedule-empty">No events in this lens yet. Try another filter.</div>`;
      return;
    }

    scheduleList.innerHTML = matches.map(item => `
      <article class="schedule-row">
        <time>${item.time} <small>${item.date}</small></time>
        <div>
          <span>${item.type}</span>
          <h3>${item.title}</h3>
          <p>${item.venue}</p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </article>
    `).join('');
  }

  if (dayTabs) {
    dayTabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        dayTabs.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentDay = btn.dataset.day || 'DAY 01';
        renderSchedule();
      });
    });
  }

  if (filterTabs) {
    filterTabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterTabs.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentFilter = btn.dataset.filter || 'ALL';
        renderSchedule();
      });
    });
  }

  renderSchedule();

  // 7. Registration Modal Dialog
  const modalBackdrop = document.getElementById('modal-backdrop');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const registrationForm = document.getElementById('registration-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function openModal() {
    if (modalBackdrop) modalBackdrop.classList.add('show');
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.classList.remove('show');
  }

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Open triggers
  ['open-register-nav-btn', 'hero-register-btn', 'cta-register-btn', 'mobile-register-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('show')) {
      closeModal();
    }
  });

  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) submitBtn.textContent = 'SENDING...';

      setTimeout(() => {
        if (submitBtn) submitBtn.innerHTML = `SEND INTEREST <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        closeModal();
        registrationForm.reset();
        showToast("You're on the list! AIDW 2026 registration interest received.");
      }, 500);
    });
  }

  // 8. Scroll Cue Button
  const scrollCueBtn = document.getElementById('scroll-cue-btn');
  if (scrollCueBtn) {
    scrollCueBtn.addEventListener('click', () => {
      const speakersSec = document.getElementById('speakers');
      if (speakersSec) speakersSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
