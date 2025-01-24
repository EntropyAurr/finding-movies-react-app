/* eslint-disable react-hooks/exhaustive-deps */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const KEY = "b852c9ac";
const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
          const data = await res.json();

          if (!res.ok) throw new Error("Something went wrong while fetching movies");
          if (data.Response === "false") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (error.name === "AbortError") {
            setError(err.message);
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>{!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}</Box>

        <Box>
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🦊</span>
      <h1>Fox Movies</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="finding">
      <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}></FontAwesomeIcon>
      <input className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Movies name..." />
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🌠: {movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails() {
  const [movie, setMovie] = useState({});

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime),
    };
  }

  return <div className="details"></div>;
}

function WatchedSummary({ watched }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span></span>
        </p>
        <p>
          <span>💫</span>
          <span></span>
        </p>
        <p>
          <span>⏳</span>
          <span>min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList() {}
