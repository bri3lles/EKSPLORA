/**
 * JATIM HERITAGE ADMIN — Profil & Pengaturan
 * pengaturan.js — Avatar upload, dark mode, password form, session revoke
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Avatar Upload Preview ────────────────────────────────────────────────
  const avatarInput   = document.querySelector('#avatar-input');
  const avatarPreview = document.querySelector('#avatar-preview');

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file melebihi 2MB. Silakan pilih file yang lebih kecil.');
        this.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = e => { avatarPreview.src = e.target.result; };
      reader.readAsDataURL(file);
    });
  }

  // ─── Dark Mode Toggle ─────────────────────────────────────────────────────
  const darkToggle = document.querySelector('#dark-mode-toggle');
  if (darkToggle) {
    // Restore saved preference
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      darkToggle.checked = true;
    }

    darkToggle.addEventListener('change', function () {
      if (this.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ─── Save Changes Button ──────────────────────────────────────────────────
  const saveBtn = document.querySelector('#btn-save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const original = this.textContent;
      this.textContent = 'Menyimpan...';
      this.disabled = true;
      setTimeout(() => {
        this.textContent = '✓ Tersimpan';
        setTimeout(() => {
          this.textContent = original;
          this.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  // ─── Change Password Form ─────────────────────────────────────────────────
  const updatePassBtn = document.querySelector('#btn-update-password');
  if (updatePassBtn) {
    updatePassBtn.addEventListener('click', function () {
      const current  = document.querySelector('#input-current-password')?.value;
      const newPass  = document.querySelector('#input-new-password')?.value;
      const confirm  = document.querySelector('#input-confirm-password')?.value;

      if (!current || !newPass || !confirm) {
        alert('Harap isi semua kolom kata sandi.');
        return;
      }
      if (newPass !== confirm) {
        alert('Konfirmasi kata sandi tidak cocok.');
        return;
      }
      if (newPass.length < 8) {
        alert('Kata sandi baru harus minimal 8 karakter.');
        return;
      }

      alert('Kata sandi berhasil diperbarui!');
      document.querySelector('#input-current-password').value = '';
      document.querySelector('#input-new-password').value     = '';
      document.querySelector('#input-confirm-password').value = '';
    });
  }

  // ─── Revoke Session ───────────────────────────────────────────────────────
  document.querySelectorAll('.btn-revoke-session').forEach(btn => {
    btn.addEventListener('click', function () {
      const row      = this.closest('.session-item');
      const location = row?.querySelector('.session-location')?.textContent || 'sesi ini';
      if (confirm(`Cabut akses dari "${location}"?`)) {
        row.style.transition = 'opacity 0.3s';
        row.style.opacity    = '0';
        setTimeout(() => row.remove(), 300);
      }
    });
  });

  // ─── Deactivate Account ───────────────────────────────────────────────────
  const deactivateBtn = document.querySelector('#btn-deactivate');
  if (deactivateBtn) {
    deactivateBtn.addEventListener('click', function () {
      const confirmed = confirm(
        'PERINGATAN: Menonaktifkan akun bersifat permanen.\nSemua log audit akan diarsipkan secara anonim.\n\nLanjutkan?'
      );
      if (confirmed) alert('Permintaan penonaktifan dikirim ke superadmin untuk persetujuan.');
    });
  }

});