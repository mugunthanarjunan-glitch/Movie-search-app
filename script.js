const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieResult = document.getElementById("movieResult");

const apiKey = "708949e2"; //My API key

searchBtn.addEventListener("click", async () => {
  const movieName = movieInput.value.trim();

  if (movieName === "") {
    movieResult.innerHTML = "<p>Please enter a movie name 😅</p>";
    return;
  }

  movieResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
      movieResult.innerHTML = `
        <div class="movie-card">
          <img src="${data.Poster}" alt="Poster of ${data.Title}" />
          <div class="movie-info">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <div class="links">
              <a class="youtube" href="https://www.youtube.com/results?search_query=${data.Title}+trailer" target="_blank">🎬 Watch Trailer</a>
              <a class="imdb" href="https://www.imdb.com/title/${data.imdbID}/" target="_blank">⭐ IMDb Page</a>
            </div>
          </div>
        </div>
      `;
    } else {
      movieResult.innerHTML = `<p>❌ Movie not found! Try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    movieResult.innerHTML = `<p>⚠️ Something went wrong. Please try again later.</p>`;
  }
});
