"use client";

import DisplayMovie from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/common/Loading";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

const FavoritesPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const { favorites, removeFavorite } = useFavorites();
  const [displayPerPage, setDisplayPerPage] = useState<typeof favorites>([]);

  useEffect(() => {
    setDisplayPerPage(paginateResults(favorites));
  }, [favorites, currentPage, moviesPerPage]);

  const paginateResults = (results: typeof favorites) => {
    return results.slice(
      currentPage * moviesPerPage,
      (currentPage + 1) * moviesPerPage
    );
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setDisplayPerPage(favorites);
      return;
    }
    setDisplayPerPage((prevs) => {
      const filtered = prevs.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      return paginateResults(filtered);
    });
  };

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
          {displayPerPage.map((movie, index) => (
            <DisplayMovie
              key={movie.id}
              onFavoriteClick={removeFavorite}
              movie={movie}
              isFavorite={true}
            />
          ))}

          {favorites.length > moviesPerPage && (
            <div className={styles.paginationContainer}>
              <LimitPerView onSelect={(value) => setMoviesPerPage(value)} />
              <Pagination
                hasNextPage={
                  favorites.length > (currentPage + 1) * moviesPerPage
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
