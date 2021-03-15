import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const Ticket = ({ match }) => {
  return (
    <div className="app-wrapper react-transition swipe-right">
      <Switch>
        <Route
          path={`${match.url}/add-ticket`}
          component={asyncComponent(() => import("./AddTicket"))}
        />
        <Route
          path={`${match.url}/detail`}
          component={asyncComponent(() => import("./TicketInfo"))}
        />
        <Route
          path={`${match.url}/edit`}
          component={asyncComponent(() => import("./EditTicket"))}
        />
        <Route
          path={`${match.url}`}
          component={asyncComponent(() => import("./Tiket"))}
        />
      </Switch>
    </div>
  );
};

export default Ticket;
