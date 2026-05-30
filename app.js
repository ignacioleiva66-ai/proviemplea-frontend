// ==================== DATOS MOCK ====================
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
        { id: 4, titulo: "Guardia de Seguridad", empresa: "Seguridad Providencia", ubicacion: "Providencia", jornada: "Turnos rotativos", sueldo: "$650.000", tags: ["Vigilancia", "Escolta"] },
        { id: 5, titulo: "Asistente Administrativo", empresa: "Corporación Municipal", ubicacion: "Providencia", jornada: "Part time (20 hrs)", sueldo: "$450.000", tags: ["Office", "Atención"] }
    ],
    testimonios: [
        { nombre: "María González", texto: "Postulé a un part-time y en una semana ya estaba trabajando." },
        { nombre: "Carlos Méndez", texto: "La transparencia en los sueldos me ayudó a elegir mejor." },
        { nombre: "Javiera Rojas", texto: "Los cursos gratuitos mejoraron mi CV." }
    ],
    faq: [
        { pregunta: "¿Cómo postulo a una oferta?", respuesta: "Haz clic en 'Postular' en la tarjeta del empleo y completa el formulario." },
        { pregunta: "¿Hay costo para postular?", respuesta: "No, es completamente gratuito." },
        { pregunta: "¿Puedo subir documentos?", respuesta: "Sí, CV y certificados." }
    ]
};

function fetchData(endpoint) {
    return new Promise(resolve => setTimeout(() => resolve(mockAPI[endpoint]), 200));
}

// ========== COMPONENTE TARJETA ==========
function crearTarjetaEmpleo(oferta) {
    return `
        <div class="card oferta-card" data-id="${oferta.id}">
            <h3>${oferta.titulo}</h3>
            <p><strong>${oferta.empresa}</strong> - ${oferta.ubicacion}</p>
            <div class="jornada">${oferta.jornada}</div>
            <div class="sueldo">💰 ${oferta.sueldo}</div>
            <div class="tags" style="margin:10px 0">
                ${oferta.tags.map(t => `<span style="background:#eef2ff; padding:4px 8px; border-radius:20px; margin-right:5px;">${t}</span>`).join('')}
            </div>
            <button class="btn-postular" data-titulo="${oferta.titulo}">📌 Postular ahora</button>
        </div>
    `;
}

// ========== BUSCADOR CON MENSAJE "NO RESULTADOS" ==========
let todasOfertas = [];

async function cargarOfertas(filtro = "") {
    const container = document.getElementById('ofertas-container');
    const noResultadosDiv = document.getElementById('noResultados');
    
    // Validar que los elementos existan
    if (!container || !noResultadosDiv) return;

    // Solo hacer fetch si el arreglo está vacío (optimiza el buscador)
    if (todasOfertas.length === 0) {
        todasOfertas = await fetchData('ofertas');
    }

    const filtroLower = filtro.toLowerCase().trim();
    const filtradas = todasOfertas.filter(o => 
        o.titulo.toLowerCase().includes(filtroLower) ||
        o.empresa.toLowerCase().includes(filtroLower) ||
        o.jornada.toLowerCase().includes(filtroLower)
    );

    if (filtradas.length === 0) {
        container.innerHTML = '';
        noResultadosDiv.style.display = 'block';
    } else {
        noResultadosDiv.style.display = 'none';
        container.innerHTML = filtradas.map(crearTarjetaEmpleo).join('');
    }

    // Delegación o re-asignación de eventos postular
    document.querySelectorAll('.btn-postular').forEach(btn => {
        btn.addEventListener('click', () => {
            const titulo = btn.dataset.titulo;
            abrirModalPostulacion(titulo);
        });
    });
}

function abrirModalPostulacion(tituloOferta) {
    const tituloElement = document.getElementById('modalOfertaTitulo');
    const modalElement = document.getElementById('postularModal');
    
    if (tituloElement && modalElement) {
        tituloElement.innerText = tituloOferta;
        modalElement.style.display = 'block';
    }
}

// ========== CARGAR DATOS ESTÁTICOS ==========
async function cargarNosotros() {
    const container = document.getElementById('nosotros-content');
    if (!container) return;
    
    const data = await fetchData('nosotros');
    container.innerHTML = `
        <div class="card"><h3>Misión</h3><p>${data.mision}</p></div>
        <div class="card"><h3>Visión</h3><p>${data.vision}</p></div>
        <div class="card"><h3>Valores</h3><ul>${data.valores.map(v=>`<li>${v}</li>`).join('')}</ul></div>`;
}

async function cargarServicios() {
    const container = document.getElementById('servicios-content');
    if (!container) return;

    const servicios = await fetchData('servicios');
    container.innerHTML = servicios.map(s=>`<div class="card"><h3>${s.titulo}</h3><p>${s.descripcion}</p></div>`).join('');
}

async function cargarTestimonios() {
    const wrapper = document.getElementById('testimonios-wrapper');
    if (!wrapper) return;

    const testimonios = await fetchData('testimonios');
    wrapper.innerHTML = testimonios.map(t=>`<div class="swiper-slide"><p>"${t.texto}"</p><p>- ${t.nombre}</p></div>`).join('');
    
    // Evitar que la app crashee si Swiper no se ha cargado en el HTML
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-swiper', {
            loop: true, 
            autoplay: { delay: 4000 }, 
            pagination: { el: '.swiper-pagination' }, 
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, 
            keyboard: true,
            breakpoints: { 640: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } }
        });
    } else {
        console.warn('Librería Swiper no encontrada. Los testimonios se renderizarán sin el carrusel.');
    }
}

async function cargarFaq() {
    const container = document.getElementById('faq-content');
    if (!container) return;

    const faqs = await fetchData('faq');
    container.innerHTML = faqs.map((item,idx)=>`
        <div class="faq-item" data-index="${idx}">
            <div class="faq-question"><span>${item.pregunta}</span><span>▼</span></div>
            <div class="faq-answer">${item.respuesta}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.faq-item').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('active')));
}

// ========== POSTULACIÓN (envío simulado) ==========
function initPostulacion() {
    const modal = document.getElementById('postularModal');
    const form = document.getElementById('postulacionForm');
    const msgDiv = document.getElementById('postulacionMensaje');

    if (!form || !modal || !msgDiv) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validación RUT (agrega soporte para la "k" minúscula al final por si acaso)
        const rutInput = document.getElementById('post_rut');
        const rut = rutInput ? rutInput.value : '';
        if (!/^\d{7,8}-[\dkK]$/.test(rut)) {
            msgDiv.innerHTML = '<span style="color:red">RUT inválido (formato 12345678-K)</span>';
            return;
        }
        
        const politicaInput = document.getElementById('politicaCheck');
        const politica = politicaInput ? politicaInput.checked : false;
        if (!politica) {
            msgDiv.innerHTML = '<span style="color:red">Debes aceptar la política de confidencialidad e integración.</span>';
            return;
        }
        
        const cvInput = document.getElementById('post_cv');
        const cvFile = cvInput ? cvInput.files[0] : null;
        if (!cvFile) {
            msgDiv.innerHTML = '<span style="color:red">Debes subir tu currículum.</span>';
            return;
        }

        // Simular envío
        msgDiv.innerHTML = '<span style="color:blue">Procesando...</span>';
        
        setTimeout(() => {
            msgDiv.innerHTML = '<span style="color:green">✅ Postulación enviada con éxito. Nos contactaremos pronto.</span>';
            form.reset();
            setTimeout(() => {
                msgDiv.innerHTML = '';
                modal.style.display = 'none';
            }, 2000);
        }, 500);
    });
}

// ========== NEWSLETTER ==========
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if(!input) return;
        
        const email = input.value;
        const msg = form.nextElementSibling;
        
        if (msg) {
            msg.innerText = `📧 ${email} suscrito al newsletter.`;
            setTimeout(() => msg.innerText = '', 3000);
        }
        form.reset();
    });
}

// ========== CERRAR MODALES ==========
function initModales() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// ========== UI ADICIONAL ==========
function initUI() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(link => 
            link.addEventListener('click', () => navMenu.classList.remove('active'))
        );
    }
    
    document.getElementById('scrollToOfertas')?.addEventListener('click', () => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('btnEmpresas')?.addEventListener('click', () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }));
    
    // Buscador
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn?.addEventListener('click', () => cargarOfertas(searchInput.value));
    searchInput?.addEventListener('keyup', (e) => { 
        if (e.key === 'Enter') cargarOfertas(searchInput.value); 
    });
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', async () => {
    initUI();
    initPostulacion();
    initNewsletter();
    initModales();
    
    // Cargar contenido asíncrono
    await Promise.all([
        cargarOfertas(),
        cargarNosotros(),
        cargarServicios(),
        cargarTestimonios(),
        cargarFaq()
    ]);
});
