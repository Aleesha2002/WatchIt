import React from "react";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Nomination from "./components/Nomination";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Movies} />
        <Route path="/nomination" component={Nomination} />
      </Switch>
    </Router>
  );
}
export default App;
