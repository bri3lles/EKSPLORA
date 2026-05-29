/**
 * JATIM HERITAGE ADMIN — Dashboard
 * dashboard.js — Chart hover effects and visitor trend animation
 */

document.addEventListener('DOMContentLoaded', function () {

  const chartBars = document.querySelectorAll('.chart-bar');

chartBars.forEach(bar => {

  bar.addEventListener('mouseenter', () => {
    bar.style.opacity = '0.8';
  });

  bar.addEventListener('mouseleave', () => {
    bar.style.opacity = '1';
  });

});

  // ─── Period Toggle Buttons ────────────────────────────────────────────────
  const periodBtns = document.querySelectorAll('.chart-period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      periodBtns.forEach(b => {
        b.classList.remove('chart-period-btn--active');
        b.style.backgroundColor = '';
        b.style.color = '';
        b.style.boxShadow = '';
      });
      this.classList.add('chart-period-btn--active');
      this.style.backgroundColor = '#ffffff';
      this.style.color = '#501006';
      this.style.boxShadow = '0 1px 4px rgba(80,16,6,0.1)';
    });
  });

  // ─── Animate Stat Card Numbers on Load ──────────────────────────────────
  function animateCount(el, target, suffix) {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(start).toLocaleString() + suffix;
    }, 20);
  }

  document.querySelectorAll('[data-count]').forEach(el => {
    const val    = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    animateCount(el, val, suffix);
  });

});

