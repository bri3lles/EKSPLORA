// =============================================
// JATIM HERITAGE ADMIN — script.js
// Kontrol Ulasan — Micro-interactions
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Filter Tab Toggle ──────────────────────
  const filterTabs = document.querySelectorAll('.js-filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      filterTabs.forEach(t => {
        t.classList.remove('bg-primary-container', 'text-white');
        t.classList.add('text-on-surface-variant');
      });
      this.classList.add('bg-primary-container', 'text-white');
      this.classList.remove('text-on-surface-variant');
    });
  });

  // ── Moderation Button Actions ──────────────
  document.querySelectorAll('.js-mod-btn').forEach(button => {
    button.addEventListener('click', function () {
      const action = this.dataset.action;
      const card = this.closest('.js-comment-card');

      if (action === 'approve' || action === 'delete' || action === 'ignore') {
        animateCardOut(card);
      }

      if (action === 'hide') {
        card.style.opacity = '0.4';
        card.style.pointerEvents = 'none';
        const badge = card.querySelector('.js-status-badge');
        if (badge) {
          badge.textContent = 'Disembunyikan';
          badge.className = 'js-status-badge px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-200';
        }
      }
    });
  });

  function animateCardOut(card) {
    card.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    card.style.transform = 'scale(0.98)';
    card.style.opacity = '0.4';
    setTimeout(() => {
      card.style.display = 'none';
    }, 220);
  }

  // ── Search Input Live Filter ───────────────
  const searchInput = document.querySelector('.js-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      document.querySelectorAll('.js-comment-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

});