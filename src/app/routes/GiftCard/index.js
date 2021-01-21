import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const GiftCard = ({ match }) => (
  <div className="app-wrapper react-transition swipe-right">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}/generation/add`}
        component={asyncComponent(() => import("./Generation/AddGeneration"))}
      />
      <Route
        path={`${match.url}/generation/detail`}
        component={asyncComponent(() => import("./Generation/GenerationInfo"))}
      />
      <Route
        path={`${match.url}/generation`}
        component={asyncComponent(() => import("./Generation/Generation"))}
      />
      <Route
        path={`${match.url}/template/edit`}
        component={asyncComponent(() => import("./Template/EditTemplate"))}
      />
      <Route
        path={`${match.url}/template/add`}
        component={asyncComponent(() => import("./Template/NewTemplate"))}
      />
      <Route
        path={`${match.url}/template`}
        component={asyncComponent(() => import("./Template/Template"))}
      />
      <Route
        path={`${match.url}/codes`}
        component={asyncComponent(() => import("./Code/Code"))}
      />
    </Switch>
  </div>
);

export default GiftCard;
