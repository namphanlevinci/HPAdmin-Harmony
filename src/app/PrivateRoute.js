import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkPermission from "../util/checkPermission";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkPermission(rest.permissionID) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/app/403",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
