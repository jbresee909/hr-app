import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/list" component={List} />
    </Switch>
  );
};

export default App;
