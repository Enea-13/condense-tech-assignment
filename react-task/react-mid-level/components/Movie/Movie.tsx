"use client";

import Image from "next/image";
import styles from "./Movie.module.css";

export type Movie = {
  Title: string;
  Year: string;
  Runtime: string;
  Poster: string;
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
        src={movie.Poster}
        alt={movie.Title}
        width={150}
        height={150}
        quality={95}
        priority={true}
      />
      <div className={styles.movieHeader}>
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        {/* <p className={styles.escription}>{movie.description}</p> */}
        <p className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
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
