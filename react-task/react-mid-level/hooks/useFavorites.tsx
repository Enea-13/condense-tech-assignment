import { type Movie } from "@/components/Movie";
import { useCallback, useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const getFavorites = useCallback(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const addFavoriteClick = (movie: Movie): void => {
    // if movie is already in favorites return
    if (favorites.some((favorite) => favorite.Title === movie.Title)) {
      return;
    }
    setFavorites((prevState) => {
      const newFavorites = [...prevState, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
    //TODO:set notification("Added to favorites")
    alert("New movie added!");
  };

  const removeFavorite = (movie: Movie): void => {
    const index = favorites.indexOf(movie);
    setFavorites((prevState) => {
      const newFavorites = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
    //TODO:set notification("Removed from favorites")
    alert("Movie removed!");
  };

  return {
    favorites,
    addFavoriteClick,
    removeFavorite,
  };
};
