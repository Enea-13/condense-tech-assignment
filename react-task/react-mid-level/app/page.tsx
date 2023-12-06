"use client";

import Loading from "@/components/Loading";
import DisplayMovie, { type Movie } from "@/components/Movie/Movie";
import LimitPerView from "@/components/Pagination/LimitPerView";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar";
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

  const [searchPage, setSearchPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const handleSearch = async (query: string) => {
    if (query === "") {
      setSearchPage(0);
      setResultsPerPage(10);
      setSearchResults([]);
      return;
    }

    const { data } = await graphqlClient.query({
      query: SEARCH_MOVIES,
      variables: { query },
    });
    setSearchResults(data.moviesCollection.edges);
  };

  const paginateSearchResults = (results: typeof favorites) => {
    return results.slice(
      searchPage * resultsPerPage,
      (searchPage + 1) * resultsPerPage
    );
  };

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.id === Number(movie.id));

  const handleFavoriteClick = (movie: Movie) =>
    isFavorite(movie) ? removeFavorite : addFavoriteClick;

  const isSearchMode = () => searchResults.length > 0;

  const handleLimitPerViewSelect = () =>
    isSearchMode() ? setResultsPerPage : setMoviesPerPage;

  const handlePageChange = () =>
    isSearchMode() ? setSearchPage : setCurrentPage;

  const hasNextPage = () =>
    isSearchMode()
      ? searchPage + 1 < Math.ceil(searchResults.length / resultsPerPage)
      : true;

  const recordsToDisplay = isSearchMode()
    ? paginateSearchResults(searchResults)
    : movies;

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
          {recordsToDisplay.map((_movie) => {
            const movie = isSearchMode() ? _movie.node : _movie;
            return (
              <DisplayMovie
                key={movie.id}
                onFavoriteClick={handleFavoriteClick(movie)}
                movie={movie}
                isFavorite={isFavorite(movie)}
              />
            );
          })}
          <div className={styles.paginationContainer}>
            <LimitPerView onSelect={handleLimitPerViewSelect()} />
            <Pagination
              hasNextPage={hasNextPage()}
              setCurrentPage={handlePageChange()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
