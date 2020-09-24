import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
function Row(props) {
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    fetchMovies();
  }, [props.fetchUrl]);

  const fetchMovies = async () => {
    const req = await axios.get(props.fetchUrl);
    setMovies(req.data.results);
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const getMovieId = (movie) => {
    movieTrailer(movie?.name || movie?.title || "")
      .then((url) => {
        //this movie triler reurn a full url from the name we give so i need just the id of the url
        //https://www.youtube.com/watch?v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=4
        const urlPar = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlPar.get("v"));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handelClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      getMovieId(movie);
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h3 className="poster__title">{props.title}</h3>

      <div className="row__posters">
        {/* row poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handelClick(movie)}
            className={`row__poster ${props.isLarge && "row__posterLarge"}`}
            src={`${baseUrl}${
              props.isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
