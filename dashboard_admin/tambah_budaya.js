const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('hero-upload');
const textarea = document.getElementById('deskripsi');
const counter = document.getElementById('counter');

/* =========================
   Drag & Drop Upload
========================= */

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();

  uploadArea.classList.add('upload-area--active');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('upload-area--active');
});

uploadArea.addEventListener('drop', () => {
  uploadArea.classList.remove('upload-area--active');
});

/* =========================
   Preview Image
========================= */

fileInput.addEventListener('change', function () {

  if (this.files && this.files[0]) {

    const reader = new FileReader();

    reader.onload = function (event) {

      uploadArea.innerHTML = `
        <img
          src="${event.target.result}"
          class="upload-preview"
        >

        <div class="upload-overlay">

          <div class="upload-overlay__content">

            <span class="material-symbols-outlined">
              edit
            </span>

            <span>Ganti Foto</span>

          </div>

        </div>

        <input
          type="file"
          id="hero-upload"
        >
      `;

    };

    reader.readAsDataURL(this.files[0]);
  }

});

/* =========================
   Character Counter
========================= */

textarea.addEventListener('input', () => {

  const total = textarea.value.length;

  counter.textContent = `${total}/2000`;

});