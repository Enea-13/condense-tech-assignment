"use client";
import Image from "next/image";

export type Movie = {
  Title: string;
  Year: string;
  Runtime: string;
  Poster: string;
};

type DisplayMovieProps = {
  movie: Movie;
  icon: string;
  onFavoriteClick: (movie: Movie) => void;
};

function DisplayMovie({ onFavoriteClick, movie, icon }: DisplayMovieProps) {
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
      <button onClick={() => onFavoriteClick(movie)}> {icon}</button>
    </div>
  );
}

export default DisplayMovie;
