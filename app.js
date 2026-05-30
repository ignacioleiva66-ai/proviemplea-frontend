// ==================== CONFIGURACIÓN API ====================
// Si usas json-server local, cambia esta URL a 'http://localhost:3000'
// Para este ejemplo, usaremos datos mockeados directamente, pero la estructura es idéntica a una API real.
// Así funciona sin necesidad de instalar nada extra.

// Datos mock (simulan respuesta de API)
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
        { id: 1, titulo: "Desarrollador Frontend", empresa: "Tecnológica Ltda", ubicacion: "Providencia", tags: ["React", "CSS"] },
        { id: 2, titulo: "Asesor Comercial", empresa: "Grupo Retail", ubicacion: "Metro Los Leones", tags: ["Ventas", "Atención"] },
        { id: 3, titulo: "Community Manager", empresa: "Agencia Digital", ubicacion: "Remoto", tags: ["Redes", "Creatividad"] }
    ],
    testimonios: [
        { nombre: "María González", texto: "Encontré trabajo en 2 semanas gracias a Proviemplea. Proceso justo y rápido." },
        { nombre: "Carlos Méndez", texto: "Las empresas me contactaron a mí. Nunca había vivido una experiencia así." },
        { nombre: "Javiera Rojas", texto: "Los cursos gratuitos me ayudaron a mejorar mi perfil." }
    ],
    faq: [
        { pregunta: "¿Cómo me registro?", respuesta: "Solo completa el formulario de contacto y te llamaremos." },
        { pregunta: "¿Es gratuito?", respuesta: "Sí, 100% gratuito para talentos de Providencia." },
        { pregunta: "¿Empresas pueden publicar?", respuesta: "Sí, escríbenos y te ayudamos." }
    ]
};

// Función genérica para obtener datos (simula fetch)
async function fetchData(endpoint) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockAPI[endpoint]);
        }, 300);
    });
}

// ==================== COMPONENTE REUTILIZABLE: Tarjeta de Oferta ====================
function crearTarjetaOferta(oferta) {
    return `
        <div class="card oferta-card" data-id="${oferta.id}">
            <h3>${oferta.titulo}</h3>
            <p><strong>${oferta.empresa}</strong> - ${oferta.ubicacion}</p>
            <div class="tags" style="margin: 10px 0">
                ${oferta.tags.map(tag => `<span style="background:#eef2ff; padding:4px 8px; border-radius:20px; margin-right:5px;">${tag}</span>`).join('')}
            </div>
            <button class="btn-contacto" data-servicio="${oferta.titulo}">Contáctanos</button>
        </div>
    `;
}

// ==================== RENDERIZAR OFERTAS ====================
async function cargarOfertas() {
    const container = document.getElementById('ofertas-container');
    if (!container) return;
    const ofertas = await fetchData('ofertas');
    container.innerHTML = ofertas.map(crearTarjetaOferta).join('');
    // Agregar evento a botones "Contáctanos"
    document.querySelectorAll('.btn-contacto').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const servicio = btn.dataset.servicio;
            const selectServicio = document.querySelector('select[name="servicio"]');
            if (selectServicio) {
                selectServicio.value = servicio;
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== CARGAR NOSOTROS ====================
async function cargarNosotros() {
    const container = document.getElementById('nosotros-content');
    if (!container) return;
    const data = await fetchData('nosotros');
    container.innerHTML = `
        <div class="card">
            <h3>Misión</h3>
            <p>${data.mision}</p>
        </div>
        <div class="card">
            <h3>Visión</h3>
            <p>${data.vision}</p>
        </div>
        <div class="card">
            <h3>Valores</h3>
            <ul>${data.valores.map(v => `<li>${v}</li>`).join('')}</ul>
        </div>
    `;
}

// ==================== CARGAR SERVICIOS ====================
async function cargarServicios() {
    const container = document.getElementById('servicios-content');
    if (!container) return;
    const servicios = await fetchData('servicios');
    container.innerHTML = servicios.map(s => `
        <div class="card">
            <h3>${s.titulo}</h3>
            <p>${s.descripcion}</p>
        </div>
    `).join('');
}

// ==================== CARGAR TESTIMONIOS (CARRUSEL) ====================
async function cargarTestimonios() {
    const wrapper = document.getElementById('testimonios-wrapper');
    if (!wrapper) return;
    const testimonios = await fetchData('testimonios');
    wrapper.innerHTML = testimonios.map(t => `
        <div class="swiper-slide">
            <p class="testimonial-text">"${t.texto}"</p>
            <p class="testimonial-author">- ${t.nombre}</p>
        </div>
    `).join('');
    // Inicializar Swiper después de inyectar los testimonios
    new Swiper('.testimonial-swiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        keyboard: { enabled: true },
        breakpoints: { 640: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } }
    });
}

// ==================== CARGAR FAQ ====================
async function cargarFaq() {
    const container = document.getElementById('faq-content');
    if (!container) return;
    const faqs = await fetchData('faq');
    container.innerHTML = faqs.map((item, index) => `
        <div class="faq-item" data-index="${index}">
            <div class="faq-question">
                <span>${item.pregunta}</span>
                <span>▼</span>
            </div>
            <div class="faq-answer">${item.respuesta}</div>
        </div>
    `).join('');
    // Acordeón FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// ==================== FORMULARIO CON VALIDACIÓN Y SEGURIDAD ====================
function initFormulario() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const servicio = form.servicio.value;
        const mensaje = form.mensaje.value.trim();
        const msgDiv = document.getElementById('form-message');

        // Validación cliente
        if (!nombre || !email || !servicio || !mensaje) {
            msgDiv.innerHTML = '<span style="color:red;">Todos los campos son obligatorios.</span>';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            msgDiv.innerHTML = '<span style="color:red;">Email inválido.</span>';
            return;
        }

        // Simular validación servidor y token CSRF
        const token = document.getElementById('recaptchaToken').value;
        if (token !== 'simulado') {
            msgDiv.innerHTML = '<span style="color:red;">Error de seguridad. Recarga la página.</span>';
            return;
        }

        // Simular envío (aquí iría POST a API real)
        msgDiv.innerHTML = '<span style="color:green;">¡Mensaje enviado! Te contactaremos pronto.</span>';
        form.reset();
        setTimeout(() => msgDiv.innerHTML = '', 3000);
    });
}

// ==================== NAVEGACIÓN MÓVIL ====================
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==================== SCROLL SUAVE BOTÓN HERO ====================
function initScrollButtons() {
    const btn = document.getElementById('scrollToOfertas');
    if (btn) {
        btn.addEventListener('click', () => {
            document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' });
        });
    }
    const btnEmpresas = document.getElementById('btnEmpresas');
    if (btnEmpresas) {
        btnEmpresas.addEventListener('click', () => {
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ==================== INICIALIZAR TODO ====================
document.addEventListener('DOMContentLoaded', async () => {
    initMobileNav();
    initScrollButtons();
    initFormulario();
    // Cargar datos dinámicos
    await cargarOfertas();
    await cargarNosotros();
    await cargarServicios();
    await cargarTestimonios();
    await cargarFaq();
});
