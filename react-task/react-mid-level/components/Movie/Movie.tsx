"use client";

import Image from "next/image";
import styles from "./Movie.module.css";

export type Movie = {
  id: number;
  created_at: string;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
};

type DisplayMovieProps = {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteClick: (movie: Movie) => void;
};

function DisplayMovie({
  onFavoriteClick,
  movie,
  isFavorite,
}: DisplayMovieProps) {
  return (
    <div className={styles.listItem}>
      <Image
        className={styles.moviePoster}
        src={movie.posterUrl}
        alt={movie.title}
        width={150}
        height={250}
        quality={95}
        priority={true}
      />
      <div className={styles.movieHeader}>
        <h2 className={styles.movieTitle}>
          {movie.title} ({movie.year}){" "}
          <span className={styles.runtime}>{movie.runtime}min</span>
        </h2>
        <p className={styles.genres}>{movie.genres.join(" | ")}</p>
        <p className={styles.actors}>{movie.actors}</p>
        <p className={styles.description}>{movie.plot}</p>
      </div>
      <button
        className={`${styles.favoriteButton} ${
          isFavorite ? styles.goldStar : styles.greyStar
        }`}
        onClick={() => onFavoriteClick(movie)}
      >
        &#9733;
      </button>
    </div>
  );
}

export default DisplayMovie;
