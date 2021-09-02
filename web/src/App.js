import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/auth/auth.context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  console.log(`${process.env.REACT_APP_API_URL}`);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/landing" component={Landing} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/*" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
