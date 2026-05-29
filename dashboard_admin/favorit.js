/**
 * JATIM HERITAGE ADMIN — Favorites / Kontrol Favorit
 * favorit.js — Search filter, export button, ranking interactions
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Live Search on Ranking Table ────────────────────────────────────────
  const searchInput = document.querySelector('.topbar__search input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      document.querySelectorAll('#ranking-table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  // ─── Period Selector ─────────────────────────────────────────────────────
  const periodSelect = document.querySelector('#period-select');
  if (periodSelect) {
    periodSelect.addEventListener('change', function () {
      console.log('Selected period:', this.value);
      // Placeholder: re-fetch or filter data by period
    });
  }

  // ─── Export Report Button ─────────────────────────────────────────────────
  const exportBtn = document.querySelector('#btn-export');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      const originalHTML = this.innerHTML;
      this.innerHTML = '<span class="material-symbols-outlined" style="animation:spin 0.8s linear infinite">sync</span> Menyiapkan...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Selesai';
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // ─── View Detail Button (ranking table) ──────────────────────────────────
  document.querySelectorAll('.btn-view-detail').forEach(btn => {
    btn.addEventListener('click', function () {
      const row  = this.closest('tr');
      const name = row.querySelector('.asset-name')?.textContent || '';
      alert(`Detail untuk: ${name}\n(Integrasi navigasi halaman detail di sini.)`);
    });
  });

  // ─── Row Cursor Pointer ───────────────────────────────────────────────────
  document.querySelectorAll('#ranking-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
  });

});

// CSS animation for spinner (injected once)
if (!document.querySelector('#spin-keyframes')) {
  const style = document.createElement('style');
  style.id = 'spin-keyframes';
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
}