# docs/GOOD_PRACTICES.md (Plantilla de ejemplo)

## Convenciones de Nomenclatura
- **Componentes**: PascalCase (ej: `ServiceCard.vue`, `TestimonialCarousel.jsx`).
- **Funciones/Eventos**: camelCase (ej: `handleSubmit`, `fetchTestimonials`).
- **Variables/CSS**: kebab-case para clases CSS (`service-card`). 

## Estructura de Archivos
src/
├── assets/               # Imágenes, fuentes
├── components/           # Componentes reutilizables (ServiceCard, Carousel)
├── views/                # Páginas completas (Home, Contacto, Nosotros)
├── services/             # Llamadas a API (api.js)
├── utils/                # Funciones helpers (validators.js)
└── styles/               # Estilos globales

## Accesibilidad (WCAG 2.1 AA)
- **Navegación por Teclado**: Asegurar `tabindex` correcto.
- **Contraste**: Mínimo 4.5:1 para texto normal.
- **Imágenes**: Siempre usar `alt` descriptivo.
