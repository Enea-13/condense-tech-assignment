"use client";

import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
import { useFavorites } from "@/hooks/useFavorites";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

// const moviesApiUrl =
//   "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";
const moviesApiUrl = "https://mttlioitimpeuzlwsgql.supabase.co/rest/v1/movies";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dGxpb2l0aW1wZXV6bHdzZ3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MjM3MDAsImV4cCI6MjAwNjk5OTcwMH0.yEpNXeO-cwzp_tBNeITxr2RRytwbcVnMlarJs0cpNYY";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { favorites, removeFavorite, addFavoriteClick } = useFavorites();

  const getMovies = useCallback(() => {
    axios
      .get(moviesApiUrl, { headers: { apikey: apiKey } })
      .then((response) => {
        const allMovies = response.data;
        setMovies(allMovies);
      });
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.id === movie.id);

  if (movies.length === 0) {
    return <div className={styles.loading}>Loading...</div>;
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
              key={movie.id}
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
