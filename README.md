# Proviemplea – Plataforma de Intermediación Laboral Inversa
### Departamento de Empleo · Municipalidad de Providencia

---

## 📋 Descripción del Proyecto

**Proviemplea** es la plataforma digital del Departamento de Empleo de la Municipalidad de Providencia que innova el modelo tradicional de intermediación laboral mediante un sistema de **búsqueda inversa**, donde las empresas buscan proactivamente el talento de Providencia, garantizando transparencia y sin discriminación arbitraria.

---

## 🚀 Funcionalidades del Frontend

### Navegación (Navbar)
- Logo + nombre institucional
- Barra de información de contacto (dirección, teléfono, correo)
- Links de navegación: Inicio, Buscar Empleo, Cómo Funciona, Ofertas, Nosotros, Inscríbete
- Menú hamburguesa responsive para dispositivos móviles
- Efecto de scroll con sombra dinámica
- Indicador de sección activa

### Hero (Portada)
- Imagen `portada.jpg` como fondo a pantalla completa
- Overlay con gradiente para legibilidad
- Badge animado con punto pulsante
- Título, descripción y botones de acción
- Estadísticas rápidas (candidatos, empresas, transparencia)
- Flecha de scroll animada

### Buscador de Empleo
- **Tab 1 – Buscar Ofertas:**
  - Campo de cargo/habilidad/empresa
  - Campo de ubicación
  - Filtros: Área profesional, Tipo de contrato, Nivel de experiencia, Renta mensual, Beneficios, Fecha de publicación
  - Checkbox para empleos inclusivos
  - Botón de búsqueda con feedback visual
- **Tab 2 – Postular mi Perfil:**
  - Área de postulación, Disponibilidad, Modalidad, Educación, Experiencia, Situación actual
- Tags de búsqueda rápida

### Cómo Funciona
- 4 pasos ilustrados con iconos SVG
- Animación de hover en tarjetas

### Ofertas Laborales Destacadas
- Tarjetas de ofertas con empresa, cargo, ubicación, tags, salario
- Badges de "Nueva" e "Inclusivo"

### Sección Intermedia (Banner)
- Imagen `intermedia.png` como fondo
- CTA de registro

### Nosotros y Contacto
- Descripción del Departamento de Empleo
- Tarjeta sticky con:
  - Dirección: Av. Pedro de Valdivia 924, Providencia
  - Teléfonos: 981 486 946 · 956 033 204
  - Correos: solange.montaldo@providencia.cl / cecilia.ahumada@providencia.cl
  - Horario: Lunes–Jueves 9:00–17:00, Viernes 9:00–16:00

### Footer
- Descripción institucional
- Links de navegación y recursos
- Link a programas y servicios de Providencia
- Política de privacidad y acuerdo de confidencialidad

---

## 🗂️ Estructura de Archivos

```
proviemplea-frontend/
├── index.html       # Página principal
├── style.css        # Estilos globales
├── app.js           # Interacciones JavaScript
├── README.md        # Este archivo
└── assets/
    ├── portada.jpg      # Imagen hero (portada)
    ├── intermedia.png   # Imagen banner intermedio
    └── logo.bmp         # Logo Municipalidad de Providencia
```

---

## 🎨 Tecnologías y Diseño

| Aspecto | Tecnología |
|---------|------------|
| Lenguaje | HTML5, CSS3, JavaScript ES6+ |
| Tipografías | Plus Jakarta Sans (títulos), DM Sans (cuerpo) |
| Icons | SVG inline |
| Animaciones | CSS transitions + IntersectionObserver API |
| Responsivo | CSS Grid, Flexbox, media queries |
| Framework | Vanilla (sin dependencias) |

### Paleta de colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--primary` | `#0B7EC4` | Azul institucional Providencia |
| `--accent`  | `#F5A623` | Naranja de acento y CTAs |
| `--dark`    | `#0D1B2A` | Footer y textos oscuros |
| `--bg`      | `#F5F7FA` | Fondo general |

---

## ⚙️ Indicadores de la Rúbrica Cubiertos

| Indicador | Estado |
|-----------|--------|
| Propone la creación de componentes | ✅ Navbar, Hero, Buscador, Steps, Offers, Contact |
| Resuelve problemas complejos | ✅ Búsqueda inversa con múltiples filtros |
| Accesibilidad y usabilidad | ✅ Roles ARIA, contraste, responsive, labels |
| Despliegue e integración | ✅ Archivos independientes, imágenes relativas |
| Buenas prácticas | ✅ CSS Variables, separación HTML/CSS/JS, BEM-like |
| Control de versiones | ✅ Repositorio GitHub |
| Diseño de interfaces | ✅ UI centrada en usuario, jerarquía visual |
| Estrategias de optimización | ✅ IntersectionObserver, lazy CSS animations |
| Frameworks/herramientas | ✅ Google Fonts, SVG icons inline |
| Consumo de endpoints | ⏳ Pendiente integración con backend |
| Seguridad avanzada | ⏳ Pendiente implementación backend |
| Documentación | ✅ README completo |
| Liderazgo en mejora continua | ✅ Estructura escalable y comentada |

---

## 🏫 Información Académica

- **Institución:** Instituto Profesional San Sebastián
- **Asignatura:** Desarrollo Frontend – Evaluación Unidad 3
- **Actor externo:** Departamento de Empleo, Municipalidad de Providencia
- **Representantes:** Solange Montaldo Romero / Cecilia Ahumada Vásquez

---

## 📞 Contacto Institucional

| Campo | Detalle |
|-------|---------|
| Organización | Municipalidad de Providencia |
| Área | Departamento de Empleo |
| Email | solange.montaldo@providencia.cl |
| Email | cecilia.ahumada@providencia.cl |
| Teléfono | 981 486 946 / 956 033 204 |
| Dirección | Av. Pedro de Valdivia 924, Providencia |
| Horario | Lun–Jue 9:00–17:00 · Vie 9:00–16:00 |
| Web | https://providencia.cl/provi/site/artic/20200930/pags/20200930185543.html |

---

> ⚠️ **Nota de confidencialidad:** El manejo de datos personales en esta plataforma está sujeto a un acuerdo de confidencialidad conforme a la Ley 19.628 sobre Protección de la Vida Privada.
