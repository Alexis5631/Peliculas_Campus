📌 Link del Sitio: https://peliculascampus.netlify.app

# Catálogo de Películas 🎥

Bienvenido al **Peliculas Campus**, una aplicación web diseñada para facilitar la exploración de películas de manera interactiva. Con esta herramienta, puedes buscar tus películas favoritas, explorar sugerencias en tiempo real y ver información detallada en un diseño atractivo y moderno.

## Características 🚀

- **Visualización interactiva:**
  - Muestra una lista dinámica de películas con información clave como título, descripción, categoría, duración y fecha de lanzamiento.
  
- **Búsqueda avanzada:**
  - Los usuarios pueden buscar películas escribiendo su nombre parcial o completo.
  - Incluye una función de autocompletado que sugiere películas mientras escribes.

- **Detalles emergentes:**
  - Cada película incluye un botón "Ver detalles" que muestra información adicional en un pop-up elegante.

- **Sugerencias dinámicas:**
  - Filtrado de películas en tiempo real basado en las entradas del usuario.

- **Interfaz moderna y responsiva:**
  - Diseñada con un enfoque en la experiencia del usuario, adaptándose a diferentes tamaños de pantalla.

---

## Estructura del Proyecto 🗂️

El proyecto está compuesto por los siguientes archivos principales:

1. **`style.css`**
   - Define el diseño y la estética del sitio.
   - Incluye estilos para la barra de búsqueda, tarjetas de películas y pop-ups.
   - Usa fuentes importadas para darle un toque moderno.

2. **`movies.js`**
   - Contiene un listado de películas en formato JSON con los siguientes campos:
     - `title`: Título de la película.
     - `image`: Imagen representativa.
     - `description`: Descripción breve de la trama.
     - `category`: Géneros de la película.
     - `duration`: Duración en minutos.
     - `releaseDate`: Fecha de estreno.

3. **`script.js`**
   - Implementa toda la lógica de la aplicación:
     - Filtrado de películas.
     - Generación dinámica de tarjetas.
     - Manejo de eventos de búsqueda y clics en los botones.
     - Visualización y cierre de pop-ups.
---