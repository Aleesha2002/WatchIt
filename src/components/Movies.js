import React, { Component } from "react";
// import { movies } from "./getMovies";
import Banner from "./Banner";

import "./movies.css";
import axios from "axios";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: " ",
      parr: [1],
      currPage: 1,
      movies: [],
      nominations: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d9c2cdf72b12817eef0811200531ce47&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({ movies: [...data.results] });

    console.log(data);
    console.log("ComponentDidMount");
  }

  changeMovies = async () => {
    let CPage = this.state.currPage;
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d9c2cdf72b12817eef0811200531ce47&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({ movies: [...data.results] });
  };

  handleRight = () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleclick = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };

  handleNominations = (movies) => {
    let olddata = JSON.parse(localStorage.getItem("movies_app") || "[]");
    if (this.state.nominations.includes(movies.id)) {
      olddata = olddata.filter((m) => m.id != movies.id);
    } else {
      olddata.push(movies);
    }
    localStorage.setItem("movies_app", JSON.stringify(olddata));
    console.log(olddata);
    this.handleNominationState();
  };

  handleNominationState = () => {
    let olddata = JSON.parse(localStorage.getItem("movies_app") || "[]");
    let temp = olddata.map((movie) => movie.id);
    this.setState({
      nominations: [...temp],
    });
  };

  render() {
    // let movie = movies.results;
    console.log("Render");
    return (
      <>
        <Banner />
        {this.state.movies.length == 0 ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="h1_movies text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: " " })}
                >
                  <img
                    src={`
            https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.title}
                  />
                  {/* <div className="card-body"> */}
                  <h3 className="card-title movies-title">
                    {movieObj.original_title}
                  </h3>
                  {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                  <div className="button-wrapper movies-button">
                    {this.state.hover == movieObj.id && (
                      <a
                        href="#"
                        className="btn btn-primary"
                        onClick={() => this.handleNominations(movieObj)}
                      >
                        {this.state.nominations.includes(movieObj.id)
                          ? "Remove from Nominations"
                          : "Nominate"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="movies-pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link page_cursor" onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li class="page-item">
                      <a
                        class="page-link page_cursor"
                        onClick={() => this.handleclick(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link page_cursor" onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
