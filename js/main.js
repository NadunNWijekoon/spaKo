/* ============================================
   spaKo – Main JavaScript
   Shared utilities, navigation, animations
   ============================================ */

'use strict';

// ======================== Navbar ========================
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  // Scrolled class
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile sidebar toggle
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay && overlay.classList.toggle('active');
    });

    overlay && overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(path)) {
      link.classList.add('active');
    }
  });
})();

// ======================== Tabs ========================
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        // Remove active from siblings
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Show target content
        const parent = tabGroup.closest('.tab-wrapper') || document;
        parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const targetEl = (tabGroup.closest('.tab-wrapper') || document).querySelector(`#${target}`);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  });
}

// ======================== Toast Notifications ========================
const ToastManager = {
  container: null,

  init() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 3000) {
    this.init();
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
    `;
    this.container.appendChild(toast);
    setTimeout(() => toast.remove(), duration + 300);
  }
};

// ======================== Animation on Scroll ========================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ======================== Counter Animation ========================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
  }, 16);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target), 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
}

// ======================== Smooth Scroll ========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======================== Progress Bars ========================
function initProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        if (fill) {
          const width = fill.dataset.width;
          fill.style.width = width;
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));
}

// ======================== Ripple Effect on Buttons ========================
function addRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  const rect = btn.getBoundingClientRect();

  Object.assign(circle.style, {
    width: diameter + 'px',
    height: diameter + 'px',
    left: (e.clientX - rect.left - radius) + 'px',
    top: (e.clientY - rect.top - radius) + 'px',
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.3)',
    transform: 'scale(0)',
    animation: 'ripple 0.5s linear',
    pointerEvents: 'none'
  });

  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }';
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', addRipple);
});

// ======================== Copy to Clipboard ========================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      ToastManager.show('Copied to clipboard!', 'success');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    ToastManager.show('Copied to clipboard!', 'success');
  }
}

// ======================== Local Storage Helpers ========================
const Storage = {
  get: (key, def = null) => {
    try { return JSON.parse(localStorage.getItem('spako_' + key)) ?? def; } catch { return def; }
  },
  set: (key, val) => {
    try { localStorage.setItem('spako_' + key, JSON.stringify(val)); } catch {}
  },
  remove: (key) => localStorage.removeItem('spako_' + key)
};

// ======================== Auth helpers ========================
const Auth = {
  isLoggedIn: () => !!Storage.get('user'),
  getUser: () => Storage.get('user', {}),
  login: (user) => {
    Storage.set('user', user);
    Storage.set('streak', (Storage.get('streak', 0) + 1));
  },
  logout: () => {
    Storage.remove('user');
    window.location.href = 'index.html';
  }
};

// ======================== Init everything ========================
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initScrollAnimations();
  initCounters();
  initProgressBars();

  // Re-add ripple to buttons (in case DOM changed)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.removeEventListener('click', addRipple);
    btn.addEventListener('click', addRipple);
  });

  // Show welcome if logged in on dashboard
  const userWelcome = document.querySelector('.user-name-display');
  if (userWelcome) {
    const user = Auth.getUser();
    userWelcome.textContent = user.name || 'Learner';
  }
});

// Expose globally
window.spaKo = { ToastManager, Storage, Auth, copyToClipboard };
