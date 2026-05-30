// ==================== DATOS MOCK (simulan API) ====================
const mockAPI = {
    nosotros: {
        mision: "Fomentar la empleabilidad inclusiva conectando empresas con talento local de Providencia.",
        vision: "Ser el puente laboral más eficiente y transparente de Chile.",
        valores: ["Innovación", "Equidad", "Cercanía"]
    },
    servicios: [
        { titulo: "Búsqueda Inversa", descripcion: "Empresas encuentran perfiles según necesidades, sin currículum ciego." },
        { titulo: "Capacitación Continua", descripcion: "Cursos gratuitos en habilidades digitales y blandas." },
        { titulo: "Networking Empresarial", descripcion: "Vinculación con empresas de Providencia." }
    ],
    ofertas: [
        { id: 1, titulo: "Desarrollador Frontend", empresa: "Tecnológica Ltda", ubicacion: "Providencia", jornada: "Full time", sueldo: "$1.200.000 - $1.500.000", tags: ["React", "CSS"] },
        { id: 2, titulo: "Asesor Comercial", empresa: "Grupo Retail", ubicacion: "Metro Los Leones", jornada: "Part time (25 hrs)", sueldo: "$550.000", tags: ["Ventas", "Atención"] },
        { id: 3, titulo: "Community Manager", empresa: "Agencia Digital", ubicacion: "Remoto", jornada: "Full time", sueldo: "$800.000", tags: ["Redes", "Creatividad"] },
        { id: 4, titulo: "Guardia de Seguridad", empresa: "Seguridad Providencia", ubicacion: "Providencia", jornada: "Turnos rotativos", sueldo: "$650.000", tags: ["Vigilancia", "Escolta"] }
    ],
    testimonios: [
        { nombre: "María González", texto: "Postulé a un part-time y en una semana ya estaba trabajando. Increíble." },
        { nombre: "Carlos Méndez", texto: "La transparencia en los sueldos me ayudó a elegir mejor." },
        { nombre: "Javiera Rojas", texto: "Los cursos gratuitos mejoraron mi CV." }
    ],
    faq: [
        { pregunta: "¿Cómo postulo a una oferta?", respuesta: "Haz clic en 'Postular' en la tarjeta del empleo y completa el formulario." },
        { pregunta: "¿Hay costo para postular?", respuesta: "No, es completamente gratuito." },
        { pregunta: "¿Puedo postular a más de una oferta?", respuesta: "Sí, sin límite." }
    ]
};

async function fetchData(endpoint) {
    return new Promise(resolve => setTimeout(() => resolve(mockAPI[endpoint]), 200));
}

// ==================== COMPONENTE TARJETA DE EMPLEO ====================
function crearTarjetaEmpleo(oferta) {
    return `
        <div class="card oferta-card" data-id="${oferta.id}">
            <h3>${oferta.titulo}</h3>
            <p><strong>${oferta.empresa}</strong> - ${oferta.ubicacion}</p>
            <div class="jornada">${oferta.jornada}</div>
            <div class="sueldo">💰 ${oferta.sueldo}</div>
            <div class="tags" style="margin: 10px 0">
                ${oferta.tags.map(tag => `<span style="background:#eef2ff; padding:4px 8px; border-radius:20px; margin-right:5px;">${tag}</span>`).join('')}
            </div>
            <button class="btn-postular" data-titulo="${oferta.titulo}">📌 Postular ahora</button>
        </div>
    `;
}

// ==================== RENDER OFERTAS ====================
async function cargarOfertas() {
    const container = document.getElementById('ofertas-container');
    if (!container) return;
    const ofertas = await fetchData('ofertas');
    container.innerHTML = ofertas.map(crearTarjetaEmpleo).join('');
    // Asignar evento a cada botón "Postular"
    document.querySelectorAll('.btn-postular').forEach(btn => {
        btn.addEventListener('click', () => {
            const titulo = btn.dataset.titulo;
            document.getElementById('modalOfertaTitulo').innerText = titulo;
            document.getElementById('postularModal').style.display = 'block';
        });
    });
}

// ==================== CARGAR NOSOTROS, SERVICIOS, TESTIMONIOS, FAQ ====================
async function cargarNosotros() {
    const container = document.getElementById('nosotros-content');
    if (!container) return;
    const data = await fetchData('nosotros');
    container.innerHTML = `
        <div class="card"><h3>Misión</h3><p>${data.mision}</p></div>
        <div class="card"><h3>Visión</h3><p>${data.vision}</p></div>
        <div class="card"><h3>Valores</h3><ul>${data.valores.map(v => `<li>${v}</li>`).join('')}</ul></div>
    `;
}
async function cargarServicios() {
    const container = document.getElementById('servicios-content');
    if (!container) return;
    const servicios = await fetchData('servicios');
    container.innerHTML = servicios.map(s => `<div class="card"><h3>${s.titulo}</h3><p>${s.descripcion}</p></div>`).join('');
}
async function cargarTestimonios() {
    const wrapper = document.getElementById('testimonios-wrapper');
    if (!wrapper) return;
    const testimonios = await fetchData('testimonios');
    wrapper.innerHTML = testimonios.map(t => `<div class="swiper-slide"><p class="testimonial-text">"${t.texto}"</p><p class="testimonial-author">- ${t.nombre}</p></div>`).join('');
    new Swiper('.testimonial-swiper', {
        loop: true, autoplay: { delay: 4000 }, pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, keyboard: true,
        breakpoints: { 640: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } }
    });
}
async function cargarFaq() {
    const container = document.getElementById('faq-content');
    if (!container) return;
    const faqs = await fetchData('faq');
    container.innerHTML = faqs.map((item, idx) => `
        <div class="faq-item" data-index="${idx}">
            <div class="faq-question"><span>${item.pregunta}</span><span>▼</span></div>
            <div class="faq-answer">${item.respuesta}</div>
        </div>
    `).join('');
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('active'));
    });
}

// ==================== FORMULARIOS: NEWSLETTER Y POSTULACIÓN ====================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        const msg = form.nextElementSibling;
        msg.innerText = `📧 ${email} suscrito al newsletter.`;
        form.reset();
        setTimeout(() => msg.innerText = '', 3000);
    });
}

function initPostulacion() {
    const modal = document.getElementById('postularModal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('postulacionForm');
    const msgDiv = document.getElementById('postulacionMensaje');

    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validaciones básicas
        const rut = form.querySelector('[name="rut"]').value;
        if (!/^\d{7,8}-[\dkK]$/.test(rut)) {
            msgDiv.innerHTML = '<span style="color:red">RUT inválido (formato 12345678-K)</span>';
            return;
        }
        // Simular envío a API
        msgDiv.innerHTML = '<span style="color:green">✅ Postulación enviada con éxito. Te contactaremos pronto.</span>';
        form.reset();
        setTimeout(() => {
            msgDiv.innerHTML = '';
            modal.style.display = 'none';
        }, 3000);
    });
}

// ========== NAVEGACIÓN MÓVIL Y SCROLL ==========
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
    }
    document.getElementById('scrollToOfertas')?.addEventListener('click', () => document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('btnEmpresas')?.addEventListener('click', () => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' }));
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', async () => {
    initMobileNav();
    initNewsletter();
    initPostulacion();
    await cargarOfertas();
    await cargarNosotros();
    await cargarServicios();
    await cargarTestimonios();
    await cargarFaq();
});
