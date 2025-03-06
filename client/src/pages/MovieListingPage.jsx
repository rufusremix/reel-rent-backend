import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import usePrivateAxios from "../hooks/usePrivateAxios";

const MovieListingPage = () => {
  const [movies, setMovies] = useState([]);
  const axios = usePrivateAxios();
  useEffect(() => {
    const controller = new AbortController();
    const getMovies = async () => {
      try {
        const response = await axios.get("/movies", {
          signal: controller.signal,
        });
        setMovies(response.data);
      } catch (error) {
        console.log("Movies Response Error", error);
      }
    };
    getMovies();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Typography component="h1">Movie Listing Page</Typography>
      {movies && (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieListingPage;
