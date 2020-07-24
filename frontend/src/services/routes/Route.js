import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import Context from "services/store/context";
import hasRoles from "services/security/hasRoles";
import isAuth from "services/security/isAuth";

import Home from "scenes/Home/Home";

export default ({ component: Component, roles, path }) => {
  roles = roles || [];

  return (
    <Route
      path={path}
      exact={true}
      render={() =>
        hasRoles(roles) ? (
          <Component />
        ) : isAuth() ? (
          <Home />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
