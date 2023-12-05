"use client";

import DisplayMovie from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "@/components/common/Loading";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

const FavoritesPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const { favorites, removeFavorite } = useFavorites();
  const [displayPerPage, setDisplayPerPage] = useState(favorites);

  useEffect(() => {
    setDisplayPerPage(
      favorites.slice(
        currentPage * moviesPerPage,
        (currentPage + 1) * moviesPerPage
      )
    );
  }, [favorites, currentPage, moviesPerPage]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Link className={styles.favoritesLink} href="/">
          ⬅ Back
        </Link>
        <h1 className={styles.headersTitle}>Favorites</h1>
      </div>

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
                hasNextPage={true}
                hasPrevPage={true}
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
