/* =====================================================
   PROVIEMPLEA – app.js
   ===================================================== */

/* --- NAVBAR: Scroll effect & hamburger -------------- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* --- TABS del buscador ------------------------------ */
document.querySelectorAll('.stab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.search-panel').forEach(p => p.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
  });
});

/* --- Búsqueda de empleo ----------------------------- */
function buscarEmpleo() {
  const keyword    = document.getElementById('q-keyword').value.trim();
  const location   = document.getElementById('q-location').value.trim();
  const area       = document.getElementById('q-area').value;
  const contract   = document.getElementById('q-contract').value;
  const experience = document.getElementById('q-experience').value;
  const salary     = document.getElementById('q-salary').value;
  const inclusion  = document.getElementById('q-inclusion').checked;

  // Construye resumen de la búsqueda
  const filters = [];
  if (keyword)    filters.push(`Cargo: "${keyword}"`);
  if (location)   filters.push(`Ubicación: ${location}`);
  if (area)       filters.push(`Área: ${area}`);
  if (contract)   filters.push(`Contrato: ${contract}`);
  if (experience) filters.push(`Experiencia: ${experience}`);
  if (salary)     filters.push(`Renta: ${salary}`);
  if (inclusion)  filters.push('Solo empleos inclusivos');

  if (filters.length === 0) {
    mostrarNotificacion('Ingresa al menos un criterio de búsqueda', 'warning');
    return;
  }

  mostrarNotificacion(
    `Buscando: ${filters.join(' · ')}`,
    'info'
  );

  // Scroll a ofertas
  setTimeout(() => {
    document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' });
  }, 600);
}

/* --- Búsqueda rápida (tags) ------------------------- */
function quickSearch(term) {
  document.getElementById('q-keyword').value = term;
  document.getElementById('tab-buscar').scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('q-keyword').focus();
}

/* --- Notificaciones --------------------------------- */
function mostrarNotificacion(mensaje, tipo = 'info') {
  const existing = document.querySelector('.notif');
  if (existing) existing.remove();

  const colors = {
    info:    { bg: '#E6F3FC', border: '#0B7EC4', text: '#0A4E7A' },
    success: { bg: '#EAF7EE', border: '#1A8C3A', text: '#145B27' },
    warning: { bg: '#FEF3DC', border: '#F5A623', text: '#7A4E0A' },
    error:   { bg: '#FDEAEA', border: '#D0342C', text: '#7A1A15' },
  };
  const c = colors[tipo] || colors.info;

  const notif = document.createElement('div');
  notif.className = 'notif';
  notif.setAttribute('role', 'alert');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-80px);
    background: ${c.bg};
    border: 1.5px solid ${c.border};
    color: ${c.text};
    padding: 14px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    max-width: 90vw;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0,0,0,.12);
    transition: transform .35s cubic-bezier(.4,0,.2,1);
    font-family: 'DM Sans', sans-serif;
  `;
  notif.textContent = mensaje;
  document.body.appendChild(notif);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notif.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Auto-ocultar
  setTimeout(() => {
    notif.style.transform = 'translateX(-50%) translateY(-80px)';
    setTimeout(() => notif.remove(), 400);
  }, 3500);
}

/* --- Active nav link on scroll ---------------------- */
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        a.style.fontWeight = '500';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--primary)';
          a.style.fontWeight = '700';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* --- Entrance animations on scroll ----------------- */
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.step-card, .offer-card, .contact-item, .about-text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  animObserver.observe(el);
});

document.addEventListener('animationend', () => {}, { passive: true });

// Clase .visible activa la animación
document.head.insertAdjacentHTML('beforeend', `
<style>
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
</style>
`);

/* --- Año dinámico en footer ------------------------- */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
}
