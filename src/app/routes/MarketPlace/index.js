import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const MarketPlace = ({ match }) => (
  <div className="app-wrapper react-transition swipe-right">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}/home`}
        component={asyncComponent(() => import("./Market"))}
      />
    </Switch>
  </div>
);

export default MarketPlace;
