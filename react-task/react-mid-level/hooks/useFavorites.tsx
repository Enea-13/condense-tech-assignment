import { type Movie } from "@/components/Movie";
import { useNotification } from "@/context/Notification";
import { useCallback, useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { addNotification } = useNotification();

  const getFavorites = useCallback(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  // ! normally I would use a unique ID to check if movie is already in favorites
  const addFavoriteClick = (movie: Movie): void => {
    // if movie is already in favorites, do not add it
    if (favorites.some((favorite) => favorite.Title === movie.Title)) {
      return;
    }
    setFavorites((prevState) => {
      const newFavorites = [...prevState, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });

    addNotification(`New Favourite Movie!`);
  };

  const removeFavorite = (movie: Movie): void => {
    const index = favorites.findIndex(
      (favorite) => favorite.Title === movie.Title
    );
    setFavorites((prevState) => {
      const newFavorites = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });

    addNotification(`Removed from Favourites`);
  };

  return {
    favorites,
    addFavoriteClick,
    removeFavorite,
  };
};
