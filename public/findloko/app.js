'use strict';

// Theme switcher using DaisyUI data-theme on <html>
(function(){
  const html = document.documentElement;
  const select = document.getElementById('themeSelect');
  if (select) {
    const saved = localStorage.getItem('findloko:theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
      select.value = saved;
    }
    select.addEventListener('change', () => {
      const theme = select.value;
      html.setAttribute('data-theme', theme);
      localStorage.setItem('findloko:theme', theme);
    });
  }
})();

// Mobile menu toggle
(function(){
  const btn = document.getElementById('mobileMenuBtn');
  const tray = document.getElementById('mobileMenuTray');
  if (!btn || !tray) return;
  btn.addEventListener('click', () => {
    const open = tray.getAttribute('data-open') === 'true';
    tray.setAttribute('data-open', String(!open));
    tray.classList.toggle('hidden');
  });
})();

// Email form handling
(function(){
  const form = document.getElementById('emailForm');
  const input = document.getElementById('emailInput');
  const toast = (msg) => {
    const el = document.createElement('div');
    el.className = 'toast toast-top toast-center';
    el.innerHTML = `<div class="alert alert-success shadow-lg"><span>${msg}</span></div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  };
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = (input.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) {
        toast("Veuillez saisir un email valide.");
        return;
      }
      toast("Merci ! Nous vous recontacterons très vite.");
      form.reset();
    });
  }
})();

// Tiny sparkline generator (SVG)
function renderSparkline(el, points, color) {
  if (!el) return;
  const w = el.clientWidth || 160; const h = el.clientHeight || 48;
  const max = Math.max(...points); const min = Math.min(...points);
  const norm = points.map((p, i) => {
    const x = (i/(points.length-1)) * w;
    const y = h - ((p-min)/(max-min||1)) * h;
    return [x,y];
  });
  const d = norm.map((p,i)=> (i? 'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  el.innerHTML = `<svg class="sparkline" width="${w}" height="${h}"><path d="${d}" stroke="${color}"/></svg>`;
}

window.addEventListener('load', () => {
  document.querySelectorAll('[data-spark]')?.forEach((node) => {
    const pts = (node.getAttribute('data-spark')||'').split(',').map(Number);
    const color = node.getAttribute('data-color') || '#EA7A22';
    renderSparkline(node, pts, color);
  });
});
