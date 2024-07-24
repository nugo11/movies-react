import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [ser, setSer] = useState([]);
  const [turk, setTurk] = useState([]);
  const [anime, setAnime] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
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
        const baseUrl = "https://filmebi.in/db/api";

        const requests = [fetchMovies(`${baseUrl}?${queryString}`)];

        if (location.pathname === "/") {
          requests.push(
            fetchMovies(`${baseUrl}?genre=სერიალი`),
            fetchMovies(`${baseUrl}?genre=თურქული%20სერიალები`),
            fetchMovies(`${baseUrl}?genre=სერიალი%2Cანიმაციური`),
            fetchMovies(`${baseUrl}?genre=ანიმაციური`)
          );
        }

        const results = await Promise.all(requests);

        if (location.pathname === "/search") {
          setSearchResults(results[0].articles);
          setTotalPages(results[0].totalPages);
        } else {
          setMovies(results[0].articles);
          setTotalPages(results[0].totalPages);
          if (results.length > 1) {
            setSer(results[1].articles);
            setTurk(results[2].articles);
            setAnime(results[3].articles);
            setAnimation(results[4].articles);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function to clear movies state on unmount
    return () => {
      setMovies([]);
      setSearchResults([]);
      setSer([]);
      setTurk([]);
      setAnime([]);
      setAnimation([]);
    };
  }, [location.search, location.pathname]);

  return (
    <MoviesContext.Provider
      value={{ movies, searchResults, ser, turk, anime, animation, totalPages }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};
