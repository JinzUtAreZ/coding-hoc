import React from "react";
import { Redirect, Route } from "react-router-dom";

const adminAuth = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    return false;
  };

  const isAuthRole = () => {
    const role = 0;
    return role;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuthRole() === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default adminAuth;
