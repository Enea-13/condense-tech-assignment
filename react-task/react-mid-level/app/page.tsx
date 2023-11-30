"use client";

import DisplayMovie, { type Movie } from "@/components/Movie";
import { useFavorites } from "@/hooks/useFavorites";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

const moviesApiUrl =
  "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { favorites, removeFavorite, addFavoriteClick } = useFavorites();

  const getMovies = useCallback(() => {
    axios.get(moviesApiUrl).then((response) => {
      const allMovies = response.data;

      setMovies(allMovies);
    });
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.Title === movie.Title);

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className={styles.moviesContainer}>
        <h1 className={styles.moviesTitle}>Movies</h1>
        <Link href="/favorites" className={styles.favoritesLink}>
          Favorites
          <span className={styles.arrowIcon}>&#9658;</span>
        </Link>
      </div>

      <div>
        {movies.map((movie, index) => {
          return (
            <DisplayMovie
              key={index}
              onFavoriteClick={
                isFavorite(movie) ? removeFavorite : addFavoriteClick
              }
              movie={movie}
              icon={isFavorite(movie) ? "❌" : "⭐️"}
            />
          );
        })}
      </div>
    </main>
  );
}
