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
        { pregunta: "¿Cómo postulo a una oferta?", respuesta: "Haz clic en 'Postular' en la tarjeta del empleo. Debes estar registrado." },
        { pregunta: "¿Hay costo para postular?", respuesta: "No, es completamente gratuito." },
        { pregunta: "¿Puedo subir documentos?", respuesta: "Sí, CV y certificados." }
    ]
};

function fetchData(endpoint) {
    return new Promise(resolve => setTimeout(() => resolve(mockAPI[endpoint]), 200));
}

// ========== SESIÓN ==========
let currentUser = JSON.parse(localStorage.getItem('proviemplea_user')) || null;

function guardarSesion(user) {
    currentUser = user;
    localStorage.setItem('proviemplea_user', JSON.stringify(user));
}
function cerrarSesion() {
    currentUser = null;
    localStorage.removeItem('proviemplea_user');
    alert("Sesión cerrada");
    location.reload();
}
function actualizarNav() {
    const loginBtn = document.getElementById('loginBtn');
    if (currentUser) {
        loginBtn.innerHTML = `👤 ${currentUser.email.split('@')[0]} (Salir)`;
        loginBtn.href = "#";
        loginBtn.onclick = (e) => { e.preventDefault(); cerrarSesion(); };
    } else {
        loginBtn.innerHTML = "👤 Ingresar";
        loginBtn.onclick = (e) => { e.preventDefault(); abrirModalLogin(); };
    }
}

// ========== MODALES ==========
function abrirModalLogin(mostrarRegistro = true) {
    const modal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    if (mostrarRegistro) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        showRegisterLink.style.display = 'none';
        showLoginLink.style.display = 'inline';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        showRegisterLink.style.display = 'inline';
        showLoginLink.style.display = 'none';
    }
    modal.style.display = 'block';
}
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
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

// ========== BUSCADOR ==========
let todasOfertas = [];
async function cargarOfertas(filtro = "") {
    const container = document.getElementById('ofertas-container');
    if (!container) return;
    const ofertas = await fetchData('ofertas');
    todasOfertas = ofertas;
    const filtradas = ofertas.filter(o => 
        o.titulo.toLowerCase().includes(filtro) ||
        o.empresa.toLowerCase().includes(filtro) ||
        o.jornada.toLowerCase().includes(filtro)
    );
    container.innerHTML = filtradas.map(crearTarjetaEmpleo).join('');
    // Eventos postular (con verificación de sesión)
    document.querySelectorAll('.btn-postular').forEach(btn => {
        btn.addEventListener('click', () => {
            const titulo = btn.dataset.titulo;
            if (!currentUser) {
                // Si no hay sesión, abrir modal de REGISTRO (no login)
                abrirModalLogin(true);
                // Guardar la oferta pendiente para postular después del registro
                window.ofertaPendiente = titulo;
            } else {
                abrirModalPostulacion(titulo);
            }
        });
    });
}

function abrirModalPostulacion(tituloOferta) {
    document.getElementById('modalOfertaTitulo').innerText = tituloOferta;
    document.getElementById('postularModal').style.display = 'block';
}

// ========== CARGAR DATOS ESTÁTICOS ==========
async function cargarNosotros() {
    const container = document.getElementById('nosotros-content');
    const data = await fetchData('nosotros');
    container.innerHTML = `<div class="card"><h3>Misión</h3><p>${data.mision}</p></div>
        <div class="card"><h3>Visión</h3><p>${data.vision}</p></div>
        <div class="card"><h3>Valores</h3><ul>${data.valores.map(v=>`<li>${v}</li>`).join('')}</ul></div>`;
}
async function cargarServicios() {
    const container = document.getElementById('servicios-content');
    const servicios = await fetchData('servicios');
    container.innerHTML = servicios.map(s=>`<div class="card"><h3>${s.titulo}</h3><p>${s.descripcion}</p></div>`).join('');
}
async function cargarTestimonios() {
    const wrapper = document.getElementById('testimonios-wrapper');
    const testimonios = await fetchData('testimonios');
    wrapper.innerHTML = testimonios.map(t=>`<div class="swiper-slide"><p>"${t.texto}"</p><p>- ${t.nombre}</p></div>`).join('');
    new Swiper('.testimonial-swiper', {
        loop: true, autoplay:{delay:4000}, pagination:{el:'.swiper-pagination'}, navigation:{nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'}, keyboard:true,
        breakpoints:{640:{slidesPerView:1},1024:{slidesPerView:2}}
    });
}
async function cargarFaq() {
    const container = document.getElementById('faq-content');
    const faqs = await fetchData('faq');
    container.innerHTML = faqs.map((item,idx)=>`
        <div class="faq-item" data-index="${idx}">
            <div class="faq-question"><span>${item.pregunta}</span><span>▼</span></div>
            <div class="faq-answer">${item.respuesta}</div>
        </div>
    `).join('');
    document.querySelectorAll('.faq-item').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('active')));
}

// ========== LOGIN Y REGISTRO ==========
function initAuth() {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        showRegisterLink.style.display = 'none';
        showLoginLink.style.display = 'inline';
    });
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        showRegisterLink.style.display = 'inline';
        showLoginLink.style.display = 'none';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pwd = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('proviemplea_users')) || [];
        const user = users.find(u => u.email === email && u.password === pwd);
        if (user) {
            guardarSesion({ email: user.email });
            loginModal.style.display = 'none';
            location.reload(); // Recargar para actualizar navbar y ofertas
        } else {
            loginMessage.innerText = "Credenciales incorrectas. Regístrate primero.";
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const pwd = document.getElementById('regPassword').value;
        let users = JSON.parse(localStorage.getItem('proviemplea_users')) || [];
        if (users.find(u => u.email === email)) {
            registerMessage.innerText = "El correo ya está registrado.";
            return;
        }
        users.push({ email, password: pwd });
        localStorage.setItem('proviemplea_users', JSON.stringify(users));
        registerMessage.innerText = "Cuenta creada. Ahora inicia sesión.";
        // Cambiar a login automáticamente después de 1.5 segundos
        setTimeout(() => {
            showLoginLink.click();
            registerForm.reset();
            registerMessage.innerText = "";
        }, 1500);
    });
}

// ========== POSTULACIÓN ==========
function initPostulacion() {
    const modal = document.getElementById('postularModal');
    const form = document.getElementById('postulacionForm');
    const msgDiv = document.getElementById('postulacionMensaje');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rut = document.getElementById('post_rut').value;
        if (!/^\d{7,8}-[\dkK]$/.test(rut)) {
            msgDiv.innerHTML = '<span style="color:red">RUT inválido (formato 12345678-K)</span>';
            return;
        }
        const politica = document.getElementById('politicaCheck').checked;
        if (!politica) {
            msgDiv.innerHTML = '<span style="color:red">Debes aceptar la política de confidencialidad e integración.</span>';
            return;
        }
        const cvFile = document.getElementById('post_cv').files[0];
        if (!cvFile) {
            msgDiv.innerHTML = '<span style="color:red">Debes subir tu currículum.</span>';
            return;
        }
        // Simular envío
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
        const email = form.querySelector('input').value;
        const msg = form.nextElementSibling;
        msg.innerText = `📧 ${email} suscrito al newsletter.`;
        form.reset();
        setTimeout(() => msg.innerText = '', 3000);
    });
}

// ========== CERRAR MODALES (X y fondo) ==========
function initModales() {
    // Cerrar con X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            cerrarModal(modalId);
        });
    });
    // Cerrar haciendo clic fuera del contenido
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
    if (hamburger) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
    }
    document.getElementById('scrollToOfertas')?.addEventListener('click', () => document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('btnEmpresas')?.addEventListener('click', () => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' }));
    // Buscador
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    searchBtn?.addEventListener('click', () => cargarOfertas(searchInput.value.toLowerCase()));
    searchInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') cargarOfertas(searchInput.value.toLowerCase()); });
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', async () => {
    initUI();
    initAuth();
    initPostulacion();
    initNewsletter();
    initModales();
    actualizarNav();
    await cargarOfertas();
    await cargarNosotros();
    await cargarServicios();
    await cargarTestimonios();
    await cargarFaq();

    // Si hay una oferta pendiente después de registro (por si se registró y queremos postular)
    if (window.ofertaPendiente && currentUser) {
        abrirModalPostulacion(window.ofertaPendiente);
        window.ofertaPendiente = null;
    }
});
