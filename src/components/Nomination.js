import React, { Component } from "react";
//import { movies } from "./getMovies";
import "./Nomination.css";

export default class Nomination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      currgen: "All Genres",
      movies: [],
      currText: " ",
      limit: 5,
      currPage: 1,
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies_app") || "[]");
    let tempArr = [];
    data.forEach((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    tempArr.unshift("All Genres");
    this.setState({
      genres: [...tempArr],
      movies: [...data],
    });
  }

  handleGenreChange = (genre) => {
    this.setState({
      currgen: genre,
    });
  };

  sortPopularityUp = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortRatingUp = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortPopularityDown = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortRatingDown = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };

  handlePagesChange = (page) => {
    this.setState({
      currPage: page,
    });
  };

  handleDelete = (id) => {
    let newArr = [];
    newArr = this.state.movies.filter((movieObj) => movieObj.id != id);
    this.setState({
      movies: [...newArr],
    });
    localStorage.setItem("movies app", JSON.stringify(newArr));
  };

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterArray = [];

    if (this.state.currText == " ") {
      filterArray = this.state.movies;
    } else {
      filterArray = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      });
    }

    // if (this.state.currgen == "All Genres") {
    //   filterArray = this.state.movies;
    // } else {
    if (this.state.currgen != "All Genres") {
      filterArray = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen
      );
    }

    let pages = Math.ceil(filterArray.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit; //si--> starting index
    let li = si + this.state.limit; //li-->last index
    filterArray = filterArray.slice(si, li);

    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group nomination-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currgen == genre ? (
                      <li className="list-group-item nomination_genre1">
                        {genre}
                      </li>
                    ) : (
                      <li
                        className="list-group-item nomination_genre2"
                        onClick={() => this.handleGenreChange(genre)}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="col-lg-9 nomination-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={(e) =>
                      this.setState({ currText: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Rows Count"
                    value={this.state.limit}
                    onChange={(e) => this.setState({ limit: e.target.value })}
                  />
                </div>
                <div className="row">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <i
                            className="fa-solid fa-sort-up fa-lg"
                            onClick={this.sortPopularityUp}
                          ></i>
                          Popularity
                          <i
                            className="fa-solid fa-sort-down fa-lg"
                            onClick={this.sortPopularityDown}
                          ></i>
                        </th>
                        <th scope="col">
                          <i
                            className="fa-solid fa-sort-up fa-lg"
                            onClick={this.sortRatingUp}
                          ></i>
                          Ratings
                          <i
                            className="fa-solid fa-sort-down fa-lg"
                            onClick={this.sortRatingDown}
                          ></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterArray.map((movieObj) => (
                        <tr>
                          <td>
                            <img
                              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              className="nomination-img"
                            />
                            {movieObj.original_title}
                          </td>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <button
                            type="button"
                            class="btn btn-light nomination-button"
                            onClick={() => this.handleDelete(movieObj.id)}
                          >
                            <td>Delete</td>
                          </button>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      {pagesArr.map((page) => (
                        <li class="page-item">
                          <a
                            class="page-link"
                            onClick={() => this.handlePagesChange(page)}
                          >
                            {page}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
