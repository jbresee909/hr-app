import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
  return (
    <Switch>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
        </Switch>
      </div>
    </Switch>
  );
};

export default App;
