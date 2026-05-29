/**
 * JATIM HERITAGE ADMIN — Data Budaya
 * data-budaya.js — Filter, search, and table row interactions
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Live Search Filter ──────────────────────────────────────────────────
  const searchInput = document.querySelector('.topbar__search input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      document.querySelectorAll('#budaya-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  // ─── Category / Region / Status Filters ─────────────────────────────────
  const filterSelects = document.querySelectorAll('.filter-bar select');
  filterSelects.forEach(select => {
    select.addEventListener('change', applyFilters);
  });

  function applyFilters() {
    const category = document.querySelector('#filter-category')?.value || '';
    const region   = document.querySelector('#filter-region')?.value   || '';
    const status   = document.querySelector('#filter-status')?.value   || '';

    document.querySelectorAll('#budaya-table tbody tr').forEach(row => {
      const rowCategory = row.dataset.category || '';
      const rowRegion   = row.dataset.region   || '';
      const rowStatus   = row.dataset.status   || '';

      const matchCategory = !category || category === 'Semua Kategori' || rowCategory === category;
      const matchRegion   = !region   || region   === 'Semua Wilayah'  || rowRegion   === region;
      const matchStatus   = !status   || status   === 'Semua Status'   || rowStatus.toLowerCase() === status.toLowerCase();

      row.style.display = (matchCategory && matchRegion && matchStatus) ? '' : 'none';
    });
  }

  // ─── Reset Filter Button ─────────────────────────────────────────────────
  const resetBtn = document.querySelector('#reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      filterSelects.forEach(s => (s.selectedIndex = 0));
      document.querySelectorAll('#budaya-table tbody tr').forEach(row => {
        row.style.display = '';
      });
    });
  }

  // ─── Edit / Delete Button Handlers ──────────────────────────────────────
  document.querySelectorAll('.action-btn--edit').forEach(btn => {
    btn.addEventListener('click', function () {
      const row  = this.closest('tr');
      const name = row.querySelector('.asset-name')?.textContent || 'item ini';
      alert(`Edit: ${name}\n(Integrasi form edit di sini.)`);
    });
  });

  document.querySelectorAll('.action-btn--delete').forEach(btn => {
    btn.addEventListener('click', function () {
      const row  = this.closest('tr');
      const name = row.querySelector('.asset-name')?.textContent || 'item ini';
      if (confirm(`Hapus "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
        row.style.transition = 'opacity 0.3s, transform 0.3s';
        row.style.opacity    = '0';
        row.style.transform  = 'translateX(16px)';
        setTimeout(() => row.remove(), 300);
      }
    });
  });

  // ─── Add New Asset Button ─────────────────────────────────────────────────
  const addBtn = document.querySelector('#btn-tambah-budaya');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
    });
  }

});