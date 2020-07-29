import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { GET_ALL_PERMISSION } from "../../../actions/user/actions";
import { connect } from "react-redux";

import asyncComponent from "../../../util/asyncComponent";

const Accounts = ({ match }) => (
  <div className="app-wrapper">
    <Switch>
      <Route
        path={`${match.url}/admin/add`}
        component={asyncComponent(() => import("./Users/addAdmin2"))}
      />

      <Route
        path={`${match.url}/admin/profile/edit`}
        component={asyncComponent(() => import("./Users/EditUserProfile"))}
      />
      <Route
        path={`${match.url}/admin/profile`}
        component={asyncComponent(() => import("./Users/UserProfile"))}
      />
      <Route
        path={`${match.url}/admin`}
        component={asyncComponent(() => import("./Users/Users"))}
      />
      <Route
        path={`${match.url}/roles`}
        // onClick={() => this.props.GET_ALL_PERMISSION()}
        component={asyncComponent(() => import("./Roles/Roles"))}
      />
      <Route
        path={`${match.url}/logs`}
        component={asyncComponent(() => import("./Logs/Logs"))}
      />

      {/* <Route
        path={`${match.url}/add-Admin`}
        component={asyncComponent(() => import("./Users/addAdmin"))}
      /> */}
    </Switch>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  GET_ALL_PERMISSION: () => {
    dispatch(GET_ALL_PERMISSION());
  },
});

export default connect(null, mapDispatchToProps)(Accounts);
