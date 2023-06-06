import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div class="navbar">
        <div class="navbar_h1">
          <Link
            to="/"
            className="link"
            style={{ textDecoration: "none", color: "black" }}
          >
            <h1>WatchIt</h1>
          </Link>
        </div>

        <div class="navbar_right_side">
          <ul class="navList">
            <li class="navbar_h2">
              <Link
                to="/nomination"
                className="link"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>Nomination</h3>
              </Link>
            </li>
            <li class="navbar_h2">
              <Link
                to="/leaderboard"
                className="link"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>Leaderboard</h3>
              </Link>
            </li>
            <li class="navbar_h2">
              <Link
                to="/logout"
                className="link"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3 class="last">Logout</h3>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
