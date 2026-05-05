/* SealPoint Consulting — interaction layer */

(function () {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const indicator = document.getElementById('tabIndicator');
  const achievement = document.getElementById('achievement');

  // ---------- Tab indicator positioning ----------
  function moveIndicator(target) {
    if (!target || !indicator) return;
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.getBoundingClientRect();
    indicator.style.left = (rect.left - parentRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
  }

  function activateTab(tabEl) {
    if (!tabEl) return;
    const id = tabEl.dataset.tab;

    tabs.forEach(t => t.classList.toggle('active', t === tabEl));
    panels.forEach(p => {
      const isActive = p.dataset.panel === id;
      // Re-trigger entrance animation by toggling class
      p.classList.remove('active');
      if (isActive) {
        // Force reflow so animation re-runs
        void p.offsetWidth;
        p.classList.add('active');
      }
    });

    moveIndicator(tabEl);
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activateTab(t));
  });

  // Initial indicator placement (after fonts settle)
  function initIndicator() {
    const active = document.querySelector('.tab.active');
    moveIndicator(active);
  }
  window.addEventListener('load', initIndicator);
  window.addEventListener('resize', () => {
    const active = document.querySelector('.tab.active');
    moveIndicator(active);
  });
  // Backup placement in case load event already fired
  setTimeout(initIndicator, 100);
  setTimeout(initIndicator, 800);

  // ---------- Achievement popup ----------
  setTimeout(() => {
    if (achievement) achievement.classList.add('show');
  }, 2700);
  setTimeout(() => {
    if (achievement) achievement.classList.remove('show');
  }, 7200);

  // ---------- Keyboard navigation (LB / RB feel) ----------
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    const tabsArr = Array.from(tabs);
    const activeIdx = tabsArr.findIndex(t => t.classList.contains('active'));

    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
      e.preventDefault();
      const next = tabsArr[(activeIdx + 1) % tabsArr.length];
      activateTab(next);
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
      e.preventDefault();
      const prev = tabsArr[(activeIdx - 1 + tabsArr.length) % tabsArr.length];
      activateTab(prev);
    } else if (e.key === '1') { activateTab(tabsArr[0]); }
      else if (e.key === '2') { activateTab(tabsArr[1]); }
      else if (e.key === '3') { activateTab(tabsArr[2]); }
  });

  // ---------- Read More toggle ----------
  const readMoreBtn = document.getElementById('readMoreBtn');
  const readMoreExpanded = document.getElementById('readMoreExpanded');
  if (readMoreBtn && readMoreExpanded) {
    readMoreBtn.addEventListener('click', () => {
      const isOpen = readMoreExpanded.classList.toggle('open');
      readMoreExpanded.setAttribute('aria-hidden', !isOpen);
      readMoreBtn.querySelector('.cta-key').textContent = isOpen ? 'A' : 'A';
      readMoreBtn.lastChild.textContent = isOpen ? ' Read Less' : ' Read More';
    });
  }

  // ---------- Subtle pointer-driven highlight on tiles ----------
  // (Blobs are CSS-driven so we don't fight their keyframe animation.)
  document.querySelectorAll('.tile-hero, .feat-tile, .member-tile, .link-tile').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });
})();
