"use client";

import Movie from "./Movie";

export type Movie = {
  Title: string;
  Year: string;
  Runtime: string;
  Poster: string;
};

type MoviesProps = {
  movies: Movie[];
  onFavoriteClick: (movie: Movie) => void;
};

const Movies = ({ movies: movies, onFavoriteClick }: MoviesProps) => {
  return (
    <div>
      {movies.map((movie, index) => (
        <Movie key={index} onFavoriteClick={onFavoriteClick} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
