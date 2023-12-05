"use client";

import { type Movie } from "@/components/Movie/Movie";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// !this goes to .env file
const moviesApiUrl = "https://mttlioitimpeuzlwsgql.supabase.co/rest/v1/movies";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dGxpb2l0aW1wZXV6bHdzZ3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MjM3MDAsImV4cCI6MjAwNjk5OTcwMH0.yEpNXeO-cwzp_tBNeITxr2RRytwbcVnMlarJs0cpNYY";

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
