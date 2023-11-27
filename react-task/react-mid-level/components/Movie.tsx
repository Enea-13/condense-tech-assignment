"use client";
import Image from "next/image";
import { Movie } from "./MoviesList";

type MovieProps = {
  movie: Movie;
  onFavoriteClick: (movie: Movie) => void;
};

function DisplayMovie({ onFavoriteClick, movie }: MovieProps) {
  return (
    <div>
      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={300}
        height={300}
        quality={95}
        priority={true}
      />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <button onClick={() => onFavoriteClick(movie)}>⭐️</button>
    </div>
  );
}

export default DisplayMovie;
