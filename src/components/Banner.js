import { movies } from "./getMovies";
import React, { Component } from "react";
import "./banner.css";

export default class Banner extends Component {
  render() {
    console.log(movies.results.title);
    let movie = movies.results[0];
    return (
      <div className="card banner-card">
        <img
          src={`
            https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.backdrop_path}`}
          className="card-img-top banner-img"
          alt={movie.title}
        />
        {/* <div className="card-body"> */}
        <h1 className="card-title banner-title">{movie.original_title}</h1>
        <p className="card-text banner-text">{movie.overview}</p>
        {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        {/* </div> */}
      </div>
    );
  }
}
