"use client";

import Loading from "@/components/Loading";
import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
import Pagination from "@/components/Pagination/Pagination";
import { useFavorites } from "@/hooks/useFavorites";
import { useMovies } from "@/hooks/useMovies";
import Link from "next/link";
import styles from "./page.module.css";

type SearchParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: SearchParamsProps) {
  const { favorites, removeFavorite, addFavoriteClick } = useFavorites();
  const { movies } = useMovies();

  const offset = searchParams["offset"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const start = (Number(offset) - 1) * Number(limit);
  const end = start + Number(limit);

  const entries = movies.slice(start, end);

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.id === movie.id);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.headersTitle}>Movies</h1>
        <Link className={styles.favoritesLink} href="/favorites">
          Favorites ➡
        </Link>
      </div>

      {movies.length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.moviesList}>
          {entries.map((movie, index) => {
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
          <Pagination
            totalItems={movies.length}
            hasNextPage={end < movies.length}
            hasPrevPage={start > 0}
          />
        </div>
      )}
    </main>
  );
}
