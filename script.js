/* =============================================
   CRUSTIC PIZZA — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header scroll effect ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px -55% 0px`,
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');

  const closeNav = () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    navToggle.classList.add('open');
    navLinksEl.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    navToggle.classList.contains('open') ? closeNav() : openNav();
  });

  navLinksEl.querySelectorAll('a, button:not(.nav-order-btn)').forEach(el => {
    el.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Menu Tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuPanels = document.querySelectorAll('.menu-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      menuPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`tab-${target}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  /* ---------- Delivery Modal ---------- */
  const modal = document.getElementById('delivery-modal');
  const modalClose = document.getElementById('modal-close');
  let previouslyFocused = null;

  const openModal = () => {
    previouslyFocused = document.activeElement;
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
    modalClose.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.addEventListener('transitionend', () => {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (previouslyFocused) previouslyFocused.focus();
    }, { once: true });
  };

  const orderTriggers = [
    document.getElementById('nav-order-btn'),
    document.getElementById('hero-order-btn'),
    document.getElementById('menu-order-btn'),
  ].filter(Boolean);

  orderTriggers.forEach(btn => btn.addEventListener('click', openModal));

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ---------- Focus trap inside modal ---------- */
  function trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handler = e => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    element.addEventListener('keydown', handler);

    modal.addEventListener('transitionend', () => {
      if (!modal.classList.contains('open')) {
        element.removeEventListener('keydown', handler);
      }
    }, { once: true });
  }

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll(
    '.feature-item, .menu-card, .info-block, .map-figure, .delivery-platform-card, .footer-brand, .footer-links-col'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
