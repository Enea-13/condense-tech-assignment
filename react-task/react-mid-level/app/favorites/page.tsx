"use client";

import Loading from "@/components/Loading";
import DisplayMovie from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";
import { useState } from "react";
import styles from "../page.module.css";

const FavoritesPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const { favorites, removeFavorite } = useFavorites();
  const [displayPerPage, setDisplayPerPage] = useState<typeof favorites>([]);

  const paginateResults = (results: typeof favorites) => {
    return results.slice(
      currentPage * moviesPerPage,
      (currentPage + 1) * moviesPerPage
    );
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setDisplayPerPage([]);
      return;
    }

    setCurrentPage(0);
    setMoviesPerPage(10);
    setDisplayPerPage(() => {
      const filtered = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      return filtered.slice(0, 10);
    });
  };

  const toRender = displayPerPage.length > 0 ? displayPerPage : favorites;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Link className={styles.favoritesLink} href="/">
          ⬅ Back
        </Link>
        <h1 className={styles.headersTitle}>Favorites</h1>
      </div>
      <SearchBar onSearch={handleSearch} />

      {!favorites ? (
        <Loading />
      ) : (
        <div className={styles.moviesList}>
          {paginateResults(toRender).map((movie, index) => (
            <DisplayMovie
              key={movie.id}
              onFavoriteClick={removeFavorite}
              movie={movie}
              isFavorite={true}
            />
          ))}

          {toRender.length > moviesPerPage && (
            <div className={styles.paginationContainer}>
              <LimitPerView onSelect={setMoviesPerPage} />
              <Pagination
                hasNextPage={
                  toRender.length > (currentPage + 1) * moviesPerPage
                }
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
