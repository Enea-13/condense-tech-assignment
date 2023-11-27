"use client";

import Movies, { Movie } from "@/components/MoviesList";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FavoritesPage = (): JSX.Element => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  //TODO: refactor. Duplicate code
  const getFavorites = useCallback(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  //TODO: move handler?
  const handleRemoveFavorite = (movie: Movie): void => {
    const index = favorites.indexOf(movie);
    setFavorites((prevState) => {
      const newFavorites = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div>
      <div>
        <h1>Favorites</h1>
        <Link href="/">Back</Link>
      </div>
      <Movies movies={favorites} onFavoriteClick={handleRemoveFavorite} />
    </div>
  );
};

export default FavoritesPage;
