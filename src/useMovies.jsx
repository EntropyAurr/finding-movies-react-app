/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";

const KEY = "b852c9ac";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
          const data = await res.json();

          if (!res.ok) throw new Error("Something went wrong with fetching movies");
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);

          setError("");
        } catch (err) {
          if (error.name !== "AbortError") {
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

  return { movies, isLoading, error };
}
