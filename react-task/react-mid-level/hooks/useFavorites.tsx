import { type Movie } from "@/components/Movie/Movie";
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

  const addFavoriteClick = (movie: Movie): void => {
    // if movie is already in favorites, do not add it
    if (favorites.some((favorite) => favorite.id === movie.id)) {
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
    const index = favorites.findIndex((favorite) => favorite.id === movie.id);
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
