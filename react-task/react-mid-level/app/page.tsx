import Movies, { Movie } from "@/components/MoviesList";
import Notification from "@/components/Notification";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

const moviesApiUrl =
  "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const getFavorites = useCallback(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const getMovies = useCallback(() => {
    axios.get(moviesApiUrl).then((response) => {
      setMovies(response.data);
    });
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  //TODO: use add or remove favorite, depending on the use
  const handleFavoriteClick = (movie: Movie): void => {
    setFavorites((prevState) => {
      const newFavorites = [...prevState, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
    //TODO:set notification
  };

  const addFavoriteClick = (movie: Movie): void => {
    setFavorites((prevState) => {
      const newFavorites = [...prevState, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
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
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Movies</h1>
        <Link href="/favorites">View Favorites</Link>
      </div>
      <Movies movies={movies} onFavoriteClick={handleFavoriteClick} />

      <Notification />
    </main>
  );
}
