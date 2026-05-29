// =============================================
// JATIM HERITAGE ADMIN — kontrol_user.js
// Manajemen Pengguna — Micro-interactions
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Row Click → Open Detail Panel ─────────
  document.querySelectorAll('.js-user-row').forEach(row => {
    row.addEventListener('click', function (e) {
      const tag = e.target.tagName;
      // Ignore clicks on interactive elements
      if (tag === 'BUTTON' || tag === 'SPAN' || tag === 'INPUT') return;
      const name = this.querySelector('.font-bold.text-on-surface')?.textContent?.trim();
      console.log(`Row clicked — Opening detail panel for: ${name}`);
      // TODO: open side-panel / modal with user details
    });
  });

  // ── Action Buttons ─────────────────────────
  document.querySelectorAll('.js-action-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent row click
      const action = this.dataset.action;
      const row    = this.closest('.js-user-row');
      const name   = row?.querySelector('.font-bold.text-on-surface')?.textContent?.trim();

      if (action === 'ban') {
        const statusCell = row.querySelector('td:nth-child(3)');
        if (statusCell) {
          statusCell.innerHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-error-container text-error rounded-full font-label-md text-[10px] uppercase tracking-widest font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-error"></span>Banned
            </span>`;
        }
        // Swap ban button → unban
        this.dataset.action = 'unban';
        this.querySelector('.material-symbols-outlined').textContent = 'undo';
        this.classList.remove('hover:text-error');
        this.classList.add('hover:text-primary-container');
        console.log(`Banned: ${name}`);
      }

      if (action === 'unban') {
        const statusCell = row.querySelector('td:nth-child(3)');
        if (statusCell) {
          statusCell.innerHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full font-label-md text-[10px] uppercase tracking-widest font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Active
            </span>`;
        }
        // Swap unban button → ban
        this.dataset.action = 'ban';
        this.querySelector('.material-symbols-outlined').textContent = 'block';
        this.classList.remove('hover:text-primary-container');
        this.classList.add('hover:text-error');
        console.log(`Unbanned: ${name}`);
      }

      if (action === 'edit') {
        console.log(`Edit user: ${name}`);
        // TODO: open edit modal
      }

      if (action === 'more') {
        console.log(`More options for: ${name}`);
        // TODO: open context menu
      }
    });
  });

  // ── Select All Checkbox ────────────────────
  const selectAll   = document.getElementById('js-select-all');
  const bulkDelete  = document.getElementById('js-bulk-delete');
  const bulkRole    = document.getElementById('js-bulk-role');

  if (selectAll) {
    selectAll.addEventListener('change', function () {
      const checked = this.checked;
      document.querySelectorAll('.js-user-row input[type="checkbox"]').forEach(cb => {
        cb.checked = checked;
      });
      bulkDelete.disabled = !checked;
      bulkRole.disabled   = !checked;
    });
  }

  // ── Search Input Focus Effect ──────────────
  const searchInput = document.querySelector('.js-search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.classList.add('scale-[1.01]');
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.classList.remove('scale-[1.01]');
    });

    // Live filter
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      document.querySelectorAll('.js-user-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

});