import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const MarketPlace = ({ match }) => (
  <div className="app-wrapper react-transition swipe-right">
    <Switch>
      <Route
        path={`${match.url}/new-brand`}
        component={asyncComponent(() => import("./AddPlace"))}
      />
      <Route
        path={`${match.url}/home`}
        component={asyncComponent(() => import("./Market"))}
      />
      <Route
        exact
        path={`${match.url}/:id/edit`}
        component={asyncComponent(() => import("./EditPlace"))}
      />
      <Route
        exact
        path={`${match.url}/:id`}
        component={asyncComponent(() => import("./PlaceInfo"))}
      />
    </Switch>
  </div>
);

export default MarketPlace;
