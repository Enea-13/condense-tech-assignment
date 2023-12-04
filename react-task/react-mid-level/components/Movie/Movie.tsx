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
        {/* <p className={styles.movieDescription}>{movie.description}</p> */}
        <p className={styles.movieDescription}>
          moviegmetosihnbitgufdb jbvsnt gutbnsirnb tsiu ltusiugbhsnt itiushge
          slghntleruaiyhg4fr9 8hvfdjgnveui7 gujetrhgu7btg uiey.description
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
