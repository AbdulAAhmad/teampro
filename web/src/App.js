import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
