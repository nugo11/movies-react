import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages state
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async (link) => {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return await response.json();
    };

    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const queryString = queryParams.toString();
        const moviesData = await fetchMovies(`http://localhost:3000/api/articles?${queryString}`);
        setMovies(moviesData.articles); // Update state with paginated articles
        setTotalPages(moviesData.totalPages); // Update state with total pages
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <MoviesContext.Provider value={{ movies, totalPages }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};
