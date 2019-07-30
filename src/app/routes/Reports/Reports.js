import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const Reports = ({ match }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}/transactions`}
        component={asyncComponent(() => import("./Transactions/Transactions"))}
      />
    </Switch>
  </div>
);

export default Reports;
