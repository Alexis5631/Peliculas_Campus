import { movies } from './movies.js'; // Importamos las películas

const movieContainer = document.getElementById("movieContainer"); // Contenedor de películas
const searchInput = document.getElementById("searchInput"); // Barra de búsqueda
const searchButton = document.getElementById("searchButton"); // Botón de búsqueda
const suggestionsContainer = document.getElementById("suggestionsContainer"); // Contenedor de sugerencias
const noResultMessage = document.getElementById("noResultMessage"); // Mensaje de "película no existe"

// Función para mostrar todas las películas
function displayMovies(moviesToDisplay) {
  movieContainer.innerHTML = ''; // Limpiamos las películas mostradas
  moviesToDisplay.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <button class="details-button">Ver detalles</button> <!-- Botón añadido -->
    `;

    // Agregar evento al botón "Ver detalles"
    const detailsButton = movieCard.querySelector(".details-button");
    detailsButton.addEventListener("click", () => showMovieDetails(movie));

    movieContainer.appendChild(movieCard);
  });
}

// Función para mostrar detalles de una película
function showMovieDetails(movie) {
  alert(`Título: ${movie.title}\nDescripción: ${movie.description}\nCategoría: ${movie.category}`);
}

// Función para mostrar sugerencias en la barra de búsqueda
function showSuggestions(searchTerm) {
  suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias previas

  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()));

  if (filteredMovies.length > 0) {
    suggestionsContainer.style.display = 'block'; // Mostrar las sugerencias
    filteredMovies.forEach(movie => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.textContent = movie.title;
      
      // Agregar click en la sugerencia
      suggestionItem.addEventListener('click', () => {
        searchInput.value = movie.title;
        suggestionsContainer.style.display = 'none'; // Ocultar sugerencias al seleccionar una
        displayMovies([movie]); // Muestra solo la película seleccionada
      });

      suggestionsContainer.appendChild(suggestionItem);
    });
  } else {
    suggestionsContainer.style.display = 'none'; // Ocultar sugerencias si no hay coincidencias
  }
}

// Función para manejar el evento de búsqueda
function searchMovies() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    displayMovies(movies); // Mostrar todas las películas si no hay búsqueda
    noResultMessage.style.display = 'none'; // Ocultar mensaje si hay contenido
    suggestionsContainer.style.display = 'none'; // Ocultar sugerencias
  } else {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filteredMovies.length > 0) {
      displayMovies(filteredMovies);
      noResultMessage.style.display = 'none'; // Ocultar mensaje si hay resultados
      suggestionsContainer.style.display = 'none'; // Ocultar sugerencias al encontrar resultados
    } else {
      movieContainer.innerHTML = ''; // Limpiar el contenedor
      noResultMessage.style.display = 'block'; // Mostrar el mensaje si no hay resultados
      suggestionsContainer.style.display = 'none'; // Ocultar sugerencias si no hay resultados
    }
  }
}

// Mostrar todas las películas inicialmente
displayMovies(movies);

// Evento para manejar el input de búsqueda
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    showSuggestions(searchTerm);
  } else {
    displayMovies(movies); // Mostrar todas las películas si el input está vacío
    noResultMessage.style.display = 'none'; // Ocultar mensaje si está vacío
    suggestionsContainer.style.display = 'none'; // Ocultar sugerencias si está vacío
  }
});

// Evento para manejar el botón de búsqueda
searchButton.addEventListener('click', () => {
  searchMovies(); // Ejecutar búsqueda al hacer clic en el botón
});

// Evento para manejar el "Enter" en la barra de búsqueda
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchMovies(); // Ejecutar búsqueda al presionar "Enter"
  }
});
