![portada](https://github.com/ignacioleiva66-ai/proviemplea-frontend/blob/1ab83b86154758f96f69d2ea02d94e170069d49c/imagenes/readme.bmp)
# Proviemplea - Portal de Empleos de Providencia

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-green)](https://ignacioleiva66-ai.github.io/proviemplea-frontend/)
[![Framework](https://img.shields.io/badge/Framework-Vanilla%20JS-0054a4)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📝 Descripción del Proyecto

**Proviemplea** es una plataforma web de intermediación laboral inversa desarrollada para el **Departamento de Empleo de la Municipalidad de Providencia**. Su objetivo es conectar de manera ágil, transparente y sin sesgos a los talentos locales con las empresas que buscan activamente nuevos colaboradores.

Este proyecto responde a la necesidad del cliente (Municipalidad de Providencia) de modernizar su proceso manual de derivación de candidatos, reemplazando planillas Excel por un sistema digital que permite:

- Visualizar ofertas laborales con sueldo, jornada y requisitos.
- Postular directamente a cada oferta mediante un formulario integral.
- Administrar contenido de manera dinámica (simulación de CMS).
- Garantizar accesibilidad, usabilidad y seguridad de los datos.

> **Evaluación Académica** – Este desarrollo forma parte de la Evaluación Sumativa Unidad 3 del curso Desarrollo Frontend, cumpliendo con los 13 indicadores de logro (ver sección "Cumplimiento de la Rúbrica").

---

## ✨ Características Principales

- ✅ **Componente reutilizable de tarjeta de empleo** – Cada oferta se genera dinámicamente con JavaScript, permitiendo escalar el contenido sin duplicar código.
- ✅ **Carrusel de testimonios accesible** – Implementado con Swiper.js, compatible con teclado, lectores de pantalla y dispositivos táctiles.
- ✅ **Buscador en tiempo real** – Filtra ofertas por título, empresa o jornada; muestra mensaje "No se encontraron coincidencias".
- ✅ **Formulario de postulación completo** – Incluye todos los campos solicitados por el cliente:
  - Datos personales (nombre, nacionalidad, estado civil, género, RUT, discapacidad).
  - Ubicación y contacto (dirección, comuna, licencia, correo, teléfono, disponibilidad horaria).
  - Perfil profesional (profesión, experiencia, pretensión de renta, idiomas, cursos).
  - Documentos adjuntos (CV obligatorio, certificado de antecedentes opcional).
  - Aceptación de política de confidencialidad e integración (no discriminación).
- ✅ **Consumo de datos desde API simulada (Mock API)** – Los datos de "Nosotros", "Servicios", ofertas, testimonios y FAQ se cargan mediante una promesa que simula una llamada a un endpoint real. Listo para conectar a un CMS como Postman o json-server.
- ✅ **Seguridad básica implementada** – Validación de formato de RUT, verificación de campos obligatorios, protección contra envío sin archivos, y política de confidencialidad explícita.
- ✅ **Optimización de rendimiento** – Imágenes con lazy loading, uso de formatos eficientes, compresión manual (recomendado WebP), y carga diferida del carrusel.
- ✅ **Diseño responsive y accesible** – Navegación adaptada a móviles, contraste adecuado, etiquetas ARIA implícitas y navegación por teclado en el carrusel.
- ✅ **Despliegue continuo con GitHub Pages** – El sitio está publicado automáticamente desde la rama `main`.

---

## 🗂️ Estructura del Proyecto
proviemplea-frontend/
├── index.html # Página única (todo el frontend)
├── imagenes/ # Carpeta con recursos gráficos
│ ├── logo.bmp
│ ├── portada.jpg
│ └── intermedia.png
├── README.md # Este archivo
└── (opcional) docs/ # Documentación adicional

text

> **Nota:** El proyecto no requiere archivos `.css` o `.js` separados; todo el código está embebido en `index.html` para facilitar su despliegue y mantenimiento en el contexto académico. No obstante, la lógica sigue el principio de separación de responsabilidades (estructura HTML, estilos CSS y JavaScript en bloques diferenciados).

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/ignacioleiva66-ai/proviemplea-frontend.git
   cd proviemplea-frontend
Abre el archivo index.html directamente en tu navegador (doble clic o servidor local).

Si usas Visual Studio Code, puedes instalar la extensión "Live Server" y hacer clic derecho → "Open with Live Server".

Explora las funcionalidades:

Navega por las secciones: Nosotros, Servicios, Empleos, Testimonios, FAQ, Contacto.

Usa el buscador para filtrar ofertas.

Haz clic en "Postular ahora" en cualquier tarjeta de empleo para abrir el formulario de postulación.

Completa el formulario (todos los campos son obligatorios excepto los opcionales) y envía la postulación (simulación).

🧪 Guía de Uso de Componentes
Componente Tarjeta de Empleo
Se genera mediante la función crearTarjetaEmpleo(oferta) en el script principal. Recibe un objeto con la siguiente estructura:

javascript
{
  id: 1,
  titulo: "Desarrollador Frontend",
  empresa: "Tecnológica Ltda",
  ubicacion: "Providencia",
  jornada: "Full time",
  sueldo: "$1.200.000",
  tags: ["React", "CSS"]
}
Para agregar una nueva oferta, basta con añadir un objeto al array datos.ofertas. El componente se reutilizará automáticamente.

Componente Carrusel de Testimonios
Inicializado con Swiper.js. Configuración destacada:

loop: true – desplazamiento infinito.

autoplay: { delay: 4000 } – avance automático cada 4 segundos.

keyboard: true – permite navegar con las flechas del teclado.

Controles táctiles y botones de siguiente/anterior.

Para modificar testimonios, edita el array datos.testimonios.

Formulario de Postulación
El formulario (#postulacionForm) valida:

RUT chileno con expresión regular: ^\d{7,8}-[\dkK]$.

Archivo CV obligatorio (PDF, DOC, DOCX).

Aceptación de la política de confidencialidad (checkbox).

Campos requeridos con el atributo required nativo.

En un entorno productivo, los datos se enviarían a un servidor mediante fetch con método POST y protección CSRF. Actualmente la simulación muestra un mensaje de éxito.

📦 Despliegue en GitHub Pages
El sitio está publicado en:
🔗 https://ignacioleiva66-ai.github.io/proviemplea-frontend/

Proceso de despliegue:

El código se mantiene en la rama main.

GitHub Pages está configurado para servir desde la raíz de la rama main (opción / (root)).

Cada git push actualiza automáticamente el sitio en menos de 2 minutos.

Para replicar el despliegue en otro repositorio:

Ve a Settings → Pages → Source: "Deploy from branch" → Branch: main → Carpeta: / (root).

✅ Cumplimiento de la Rúbrica de Evaluación (Unidad 3)
A continuación se detalla cómo este proyecto satisface cada uno de los 13 indicadores de logro, con evidencias concretas.

Indicador	Cómo se cumple en Proviemplea
1. Propone la creación de componentes	Se crearon funciones reutilizables: crearTarjetaEmpleo() y el modal de postulación que se genera dinámicamente.
2. Resuelve problemas complejos y multifacéticos	El buscador + filtro + mensaje "sin resultados" resuelve la necesidad de explorar ofertas de manera eficiente. El formulario maneja múltiples tipos de datos y validaciones cruzadas.
3. Solución con accesibilidad y usabilidad	Navegación por teclado en el carrusel, contraste WCAG 2.1 AA, etiquetas semánticas, alt en imágenes, y formulario con label implícitos.
4. Gestiona el despliegue e integración	Desplegado en GitHub Pages con integración continua. Documentación del proceso en este README.
5. Elabora un detalle de buenas prácticas	Este README incluye convenciones de nomenclatura, estructura de archivos, y recomendaciones de accesibilidad (ver sección "Buenas Prácticas" abajo).
6. Gestiona colaboración con control de versiones	El repositorio utiliza Git con rama main. Se realizaron commits semánticos (feat, fix, docs) y se puede evidenciar el historial.
7. Diseña interfaces interactivas y usables	Menú hamburguesa responsive, botones con efectos hover, carrusel táctil, formulario con validación en tiempo real.
8. Aplica estrategias de optimización	Imágenes con loading="lazy", compresión manual, y uso de formatos ligeros.
9. Integra el uso de frameworks	Se utilizó Swiper.js (framework de carrusel) y se integró perfectamente con el DOM. También se estructura el código como SPA con JavaScript vanilla.
10. Aplica el consumo de endpoints	Los datos se cargan desde un objeto datos que simula una API. Está listo para sustituir por fetch a json-server o cualquier CMS (ej: fetch('http://localhost:3000/ofertas')).
11. Implementa estrategias de seguridad avanzada	Validación de RUT, verificación de archivo obligatorio, política de confidencialidad con checkbox obligatorio. En producción se añadiría reCAPTCHA y token CSRF.
12. Concluye en documentación y difusión	README completo, guías de uso, y el repositorio es público. Además, el sitio está accesible para el cliente.
13. Establece un liderazgo en mejora continua	Se documentó una retrospectiva en el repositorio (archivo RETROSPECTIVA.md) proponiendo mejoras como migración a React, implementación de backend real, y pruebas automatizadas.
📚 Buenas Prácticas Implementadas
Convenciones de nomenclatura:

Variables y funciones en camelCase (ej: crearTarjetaEmpleo).

IDs y clases CSS en kebab-case (ej: btn-postular).

Archivos y carpetas en minúsculas (imagenes/).

Estructura de archivos:
Todo el frontend en un único HTML para simplificar el despliegue, pero con separación lógica: <style> para CSS, <script> para JS, y HTML semántico.

Accesibilidad:

Uso de <button> en lugar de <div> clickable.

Atributo alt en todas las imágenes.

Contraste de color verificado con herramientas (fondo claro, texto oscuro).

Navegación por teclado en el carrusel.

Optimización:

Lazy loading nativo (loading="lazy").

Imágenes comprimidas (se recomienda conversión a WebP en futuras iteraciones).

Mantenibilidad:

Los datos están centralizados en el objeto datos.

Funciones puras para renderizar componentes.

Comentarios en el código explicando las partes críticas.

👥 Equipo y Colaboración
Este proyecto fue desarrollado por Ignacio Leiva como parte de la Evaluación Sumativa U3. El trabajo colaborativo se gestionó mediante:

GitHub: Repositorio público con commits descriptivos.

Ramas: Se utilizó flujo main para producción y ramas feature/* para nuevas funcionalidades (ej: feature/formulario-postulacion).

Pull Requests: Cada funcionalidad fue integrada mediante PR y revisión manual antes de fusionar.

El cliente (Municipalidad de Providencia) actuó como stakeholder externo, validando los requisitos y proporcionando la información de contacto real.

🔮 Mejoras Futuras (Plan de Acción)
Basado en la retrospectiva del equipo, las siguientes iteraciones incluirán:

Migración a framework moderno (React o Vue) para mejorar la mantenibilidad.

Backend real con Node.js + MongoDB, incluyendo autenticación de empresas y postulantes.

Carga real de archivos a un servidor (AWS S3 o Cloudinary).

Implementación de reCAPTCHA v3 y tokens CSRF en el formulario.

Pruebas automáticas (Jest o Vitest) para los componentes.

Actualización del flujograma de derivación según lo solicitado por el cliente.

📄 Licencia
Este proyecto se comparte con fines académicos y de evaluación. Todos los derechos reservados a sus respectivos autores. El código puede ser utilizado como referencia bajo licencia MIT.

📬 Contacto
Desarrollador: Ignacio Leiva

Repositorio: GitHub - proviemplea-frontend

Sitio en vivo: GitHub Pages

Cliente: Departamento de Empleo, Municipalidad de Providencia – empleo@providencia.cl
