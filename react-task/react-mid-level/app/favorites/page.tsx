"use client";

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
        <h1 className={styles.moviesTitle}>Favorites</h1>
      </div>

      <div className={styles.moviesList}>
        {favorites.map((movie, index) => (
          <DisplayMovie
            key={index}
            onFavoriteClick={removeFavorite}
            movie={movie}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
