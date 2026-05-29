/**
 * JATIM HERITAGE ADMIN — Shared Scripts
 * sidebar.js — Navigation, Topbar, and Global Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Active Nav Link Highlight ───────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ─── Sidebar Link Click (SPA simulation) ─────────────────────────────────
  document.querySelectorAll('.sidebar__nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') e.preventDefault();

      document.querySelectorAll('.sidebar__nav a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ─── Prevent Default for "#" Anchors ─────────────────────────────────────
  document.querySelectorAll('a[href="#"]').forEach(el => {
    el.addEventListener('click', e => e.preventDefault());
  });

  // ─── Search Input Focus Glow ──────────────────────────────────────────────
  const searchInput = document.querySelector('.topbar__search input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.closest('.topbar__search').style.boxShadow = '0 0 0 3px rgba(80,16,6,0.12)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.closest('.topbar__search').style.boxShadow = '';
    });
  }

  // ─── Button Press Micro-Interaction ─────────────────────────────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.97)'; });
    btn.addEventListener('mouseup',   () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave',() => { btn.style.transform = ''; });
  });

});