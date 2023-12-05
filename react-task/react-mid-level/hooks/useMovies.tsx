"use client";

import { type Movie } from "@/components/Movie/Movie";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const moviesApiUrl = process.env.NEXT_PUBLIC_MOVIES_ENDPOINT as string;
const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const getMovies = useCallback(async () => {
    const offset = currentPage * moviesPerPage;

    axios
      .get(moviesApiUrl, {
        headers: { apikey: apiKey },
        params: { limit: moviesPerPage, offset },
      })
      .then((response) => {
        const allMovies = response.data;
        setMovies(() => [...allMovies]);
      });
  }, [currentPage, moviesPerPage]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return { movies, setCurrentPage, setMoviesPerPage };
}
