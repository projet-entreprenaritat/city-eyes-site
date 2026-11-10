/**
 * CITY EYES — Application JavaScript Principale
 * Étude de marché Maroc – Casablanca 2026
 * Animations, Compteurs, Progression, Thèmes & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- 1. BARRE DE PROGRESSION AU SCROLL --- */
  const progressBar = document.getElementById('progress');
  function handleScrollProgress() {
    if (!progressBar) return;
    const docEl = document.documentElement;
    const totalHeight = docEl.scrollHeight - docEl.clientHeight;
    if (totalHeight > 0) {
      const scrolledPercent = (docEl.scrollTop / totalHeight) * 100;
      progressBar.style.width = Math.min(100, Math.max(0, scrolledPercent)) + '%';
    }
  }
  window.addEventListener('scroll', handleScrollProgress, { passive: true });

  /* --- 2. BASCULE DE THÈME CLAIR / SOMBRE --- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const rootHtml = document.documentElement;

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = systemPrefersDark ? 'dark' : 'light';
  rootHtml.setAttribute('data-theme', currentTheme);
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌓';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', currentTheme);
      if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌓';
      }
    });
  }

  /* --- 3. MENU MOBILE TIROIR --- */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.textContent = isOpen ? '✕' : '☰';
    });
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.textContent = '☰';
      });
    });
  }

  /* --- 4. NAVIGATION ACTIVE AU SCROLL --- */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + currentId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });
  sections.forEach(s => navObserver.observe(s));

  /* --- 5. APPARITIONS AU SCROLL & COMPTEURS --- */
  const reveals = document.querySelectorAll('.reveal, .stagger-group');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        // Compteurs inclus
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          if (!counter.dataset.animated) {
            animateCounter(counter);
            counter.dataset.animated = 'true';
          }
        });
        // Jauge de budget
        const segments = entry.target.querySelectorAll('.budget-segment');
        segments.forEach(seg => {
          if (seg.dataset.width) {
            seg.style.width = seg.dataset.width;
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  reveals.forEach(el => revealObserver.observe(el));

  /* --- 6. ANIMATION FLUIDE DES COMPTEURS --- */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * easeProgress);

      el.textContent = currentVal.toLocaleString('fr-FR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('fr-FR') + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  /* --- 7. TIMELINE DE LANCEMENT --- */
  const timelineSection = document.getElementById('lancement');
  const timelineProgress = document.getElementById('timelineProgress');
  if (timelineSection && timelineProgress) {
    const timelineObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineProgress.style.height = '100%';
        }
      });
    }, { threshold: 0.2 });
    timelineObs.observe(timelineSection);
  }

  /* --- 8. EFFET 3D TILT SUR LES CARTES (POINTEUR FIN SEULEMENT) --- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});


  /* 9. Contrôle de la vidéo urbaine du hero */
  const heroVideo = document.getElementById('heroVideo');
  const videoBtn = document.getElementById('videoToggleBtn');
  if (heroVideo && videoBtn) {
    if (prefersReducedMotion) {
      try { heroVideo.pause(); } catch(e){}
      const icon = videoBtn.querySelector('.ctrl-icon'), lbl = videoBtn.querySelector('.ctrl-label');
      if (icon) icon.textContent = '▶';
      if (lbl) lbl.textContent = 'Lire';
    }

    videoBtn.addEventListener('click', () => {
      const icon = videoBtn.querySelector('.ctrl-icon'), lbl = videoBtn.querySelector('.ctrl-label');
      if (heroVideo.paused) {
        heroVideo.play().then(() => {
          if (icon) icon.textContent = '⏸';
          if (lbl) lbl.textContent = 'Pause';
        }).catch(err => console.log('Autoplay policy prevented video playback:', err));
      } else {
        heroVideo.pause();
        if (icon) icon.textContent = '▶';
        if (lbl) lbl.textContent = 'Lire';
      }
    });
  }
