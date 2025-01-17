import { movies } from './movies.js';

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const suggestionsContainer = document.getElementById("suggestionsContainer");
const noResultMessage = document.getElementById("noResultMessage");

// Contenedor del pop-up
const popUpContainer = document.createElement("div");
popUpContainer.classList.add("pop-up-container");
document.body.appendChild(popUpContainer);

// Función para limpiar y ocultar sugerencias
function clearSuggestions() {
  suggestionsContainer.innerHTML = '';
  suggestionsContainer.style.display = 'none';
}

// Función para mostrar sugerencias en la barra de búsqueda
function showSuggestions(searchTerm) {
  return new Promise((resolve, reject) => {
    try {
      clearSuggestions();

      if (!searchTerm) {
        resolve([]);
        return;
      }

      setTimeout(() => {
        const filteredMovies = movies.filter(movie => 
          movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        if (filteredMovies.length > 0) {
          suggestionsContainer.style.display = 'block';
          
          filteredMovies.forEach(movie => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = movie.title;
            
            suggestionItem.addEventListener('click', () => {
              searchInput.value = movie.title;
              clearSuggestions();
              displayMovies([movie]);
            });

            suggestionsContainer.appendChild(suggestionItem);
          });

          resolve(filteredMovies);
        } else {
          clearSuggestions();
          resolve([]);
        }
      }, 300);

    } catch (error) {
      clearSuggestions();
      reject(error);
    }
  });
}

// Función para mostrar todas las películas
function displayMovies(moviesToDisplay) {
  movieContainer.innerHTML = '';
  moviesToDisplay.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <button class="details-button">Ver detalles</button>
    `;

    const detailsButton = movieCard.querySelector(".details-button");
    detailsButton.addEventListener("click", () => showMovieDetails(movie));

    movieContainer.appendChild(movieCard);
  });
}

// Función para mostrar detalles de una película en el pop-up
function showMovieDetails(movie) {
  popUpContainer.innerHTML = `
    <div class="pop-up">
      <button class="close-btn">X</button>
      <img src="${movie.image}" alt="${movie.title}" class="pop-up-img">
      <h2>${movie.title}</h2>
      <p><strong>Descripción:</strong> ${movie.description}</p>
      <p><strong>Categoría:</strong> ${movie.category}</p>
      <p><strong>Duración:</strong> ${movie.duration}</p>
      <p><strong>Fecha de lanzamiento:</strong> ${movie.releaseDate}</p>
    </div>
  `;

  // Mostrar el pop-up
  popUpContainer.style.display = 'flex';

  // Evento para el pop-up
  const closeButton = popUpContainer.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
    popUpContainer.style.display = 'none';
  });
}

// Función para manejar la búsqueda
function searchMovies() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    displayMovies(movies);
    noResultMessage.style.display = 'none';
    clearSuggestions();
  } else {
    const filteredMovies = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredMovies.length > 0) {
      displayMovies(filteredMovies);
      noResultMessage.style.display = 'none';
      clearSuggestions();
    } else {
      movieContainer.innerHTML = '';
      noResultMessage.style.display = 'block';
      clearSuggestions();
    }
  }
}

// Mostrar todas las películas inicialmente
displayMovies(movies);

// Evento para manejar el input de búsqueda
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();

  if (!searchTerm) {
    clearSuggestions();
    displayMovies(movies);
    noResultMessage.style.display = 'none';
    return;
  }

  showSuggestions(searchTerm)
    .then(filteredMovies => {
      console.log(`Se encontraron ${filteredMovies.length} sugerencias`);
    })
    .catch(error => {
      console.error('Error al mostrar sugerencias:', error);
      clearSuggestions();
    });
});

// Agregar evento para limpiar sugerencias al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
    clearSuggestions();
  }
});

// Evento de búsqueda al presionar el botón
searchButton.addEventListener('click', searchMovies);

// Evento de búsqueda al presionar Enter
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchMovies();
  }
});