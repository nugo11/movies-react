import React, { createContext, useState, useEffect, useContext } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies1] = useState([]);
  const [series, setSeries1] = useState([]);
  const [sabavshvo, setSabavshvo] = useState([]);

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
        const [moviesData, seriesData, sabavshvoData] = await Promise.all([
          fetchMovies(`http://localhost:3000/api/articles`),
          fetchMovies(`http://localhost:3000/api/serial`),
          fetchMovies(`http://localhost:3000/api/articles?genre=ანიმაციური`),
        ]);
        setMovies1(moviesData);
        setSeries1(seriesData);
        setSabavshvo(sabavshvoData);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  return (
    <MoviesContext.Provider
      value={{ movies, series, sabavshvo }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};
