"use client";

import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/common/Loading";
import { useFavorites } from "@/hooks/useFavorites";
import { useMovies } from "@/hooks/useMovies";
import graphqlClient, { SEARCH_MOVIES } from "@/lib/graphql-client";
import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";

export default function Home() {
  const { favorites, removeFavorite, addFavoriteClick } = useFavorites();
  const { movies, setMoviesPerPage, setCurrentPage } = useMovies();
  const [searchResults, setSearchResults] = useState<typeof movies>([]);

  const handleSearch = async (query: string) => {
    if (query === "") {
      setSearchResults([]);
      return;
    }

    const { data } = await graphqlClient.query({
      query: SEARCH_MOVIES,
      variables: { query },
    });
    setSearchResults(data.moviesCollection.edges);
  };

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.id === movie.id);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.headersTitle}>Movies</h1>
        <Link className={styles.favoritesLink} href="/favorites">
          Favorites ➡
        </Link>
      </div>
      <SearchBar onSearch={handleSearch} />

      {movies.length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.moviesList}>
          {searchResults.length > 0
            ? searchResults.map((_movie) => {
                const movie = _movie.node;
                return (
                  <DisplayMovie
                    key={movie.id}
                    onFavoriteClick={
                      isFavorite(movie) ? removeFavorite : addFavoriteClick
                    }
                    movie={movie}
                    isFavorite={isFavorite(movie)}
                  />
                );
              })
            : movies.map((movie) => (
                <DisplayMovie
                  key={movie.id}
                  onFavoriteClick={
                    isFavorite(movie) ? removeFavorite : addFavoriteClick
                  }
                  movie={movie}
                  isFavorite={isFavorite(movie)}
                />
              ))}
          <div className={styles.paginationContainer}>
            <LimitPerView onSelect={(value) => setMoviesPerPage(value)} />
            <Pagination hasNextPage={true} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      )}
    </main>
  );
}
