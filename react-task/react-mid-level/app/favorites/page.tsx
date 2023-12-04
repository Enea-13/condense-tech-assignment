"use client";

import Loading from "@/components/Loading";
import DisplayMovie from "@/components/Movie/Movie";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";
import styles from "../page.module.css";

const FavoritesPage = (): JSX.Element => {
  const { favorites, removeFavorite } = useFavorites();

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
          {favorites.map((movie, index) => (
            <DisplayMovie
              key={movie.id}
              onFavoriteClick={removeFavorite}
              movie={movie}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
