"use client";

import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "@/components/common/Loading";
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
  const { movies, setMoviesPerPage, setCurrentPage } = useMovies();

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
          <div className={styles.paginationContainer}>
            <LimitPerView onSelect={(value) => setMoviesPerPage(value)} />
            <Pagination
              hasNextPage={true}
              hasPrevPage={true}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </main>
  );
}
