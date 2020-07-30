import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Team from "./pages/Team";
import Recruiting from "./pages/Recruiting";
import Retention from "./pages/Retention";
import Permissions from "./pages/Permissions";
import ActivityLog from "./pages/ActivityLog";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/recruiting" component={Recruiting} />
      <Route exact path="/retention" component={Retention} />
      <Route exact path="/permissions" component={Permissions} />
      <Route exact path="/activity" component={ActivityLog} />
    </Switch>
  );
};

export default App;
