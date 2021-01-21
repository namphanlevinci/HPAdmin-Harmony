import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const MarketPlace = ({ match }) => (
  <div className="app-wrapper react-transition swipe-right">
    <Switch>
      <Route
        path={`${match.url}/add`}
        component={asyncComponent(() => import("./AddPlace"))}
      />
      <Route
        path={`${match.url}/home`}
        component={asyncComponent(() => import("./Market"))}
      />
    </Switch>
  </div>
);

export default MarketPlace;
