import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthState } from "../../context/auth/auth.context";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const { token } = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        !token ? (
          <Redirect to={{ pathname: "/landing" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
