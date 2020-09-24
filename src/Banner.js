import React, { useState, useEffect } from "react";
import axios from "./axios";
import request from "./request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = async () => {
    const req = await axios.get(request.fetchNetflixOriginals);
    setMovie(
      req.data.results[Math.floor(Math.random() * req.data.results.length - 1)]
    );
    return req;
  };
  function truncat(str, n) {
    return str?.length > n ? str.substr(0, n) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__container">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.orginal_name}
        </h1>
        <div>
          <button className="banner__buttons">Play</button>
          <button className="banner__buttons">My List</button>
        </div>
        <h3 className="banner__description">{truncat(movie?.overview, 150)}</h3>
      </div>
      <div className="banner--fade"></div>
    </header>
  );
}

export default Banner;
