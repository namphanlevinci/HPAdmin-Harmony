import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const GiftCard = ({ match }) => (
  <div className="app-wrapper react-transition swipe-right">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}/generation/add`}
        component={asyncComponent(() => import("./generation/add-generation"))}
      />
      <Route
        path={`${match.url}/generation/detail`}
        component={asyncComponent(() => import("./generation/generation-info"))}
      />
      <Route
        path={`${match.url}/generation`}
        component={asyncComponent(() => import("./generation/generation"))}
      />
      <Route
        path={`${match.url}/template/edit`}
        component={asyncComponent(() => import("./template/edit-template"))}
      />
      <Route
        path={`${match.url}/template/add`}
        component={asyncComponent(() => import("./template/new-template"))}
      />
      <Route
        path={`${match.url}/template`}
        component={asyncComponent(() => import("./template/template"))}
      />
      {/* <Route
        path={`${match.url}/profile`}
        component={asyncComponent(() =>
          import("./ConsumerProfile/ConsumerProfile")
        )}
      /> */}
    </Switch>
  </div>
);

export default GiftCard;
