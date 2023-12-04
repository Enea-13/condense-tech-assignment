"use client";

import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
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
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.headersTitle}>Movies</h1>
        <Link className={styles.favoritesLink} href="/favorites">
          Favorites ➡
        </Link>
      </div>

      <div className={styles.moviesList}>
        {movies.map((movie, index) => {
          return (
            <DisplayMovie
              key={index}
              onFavoriteClick={
                isFavorite(movie) ? removeFavorite : addFavoriteClick
              }
              movie={movie}
              isFavorite={isFavorite(movie)}
            />
          );
        })}
      </div>
    </main>
  );
}
