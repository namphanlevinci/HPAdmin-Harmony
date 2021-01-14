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
      <Route
        path={`${match.url}/p2p-transactions`}
        component={asyncComponent(() => import("./P2P/P2P"))}
      />
      <Route
        path={`${match.url}/gift-card-sold`}
        component={asyncComponent(() => import("./GiftCardSold/GiftCardSold"))}
      />
      <Route
        path={`${match.url}/general-reports/download-reports`}
        component={asyncComponent(() =>
          import("./GeneralReport/Statistics/DownloadReport")
        )}
      />
      <Route
        path={`${match.url}/general-reports/approved-reports`}
        component={asyncComponent(() =>
          import("./GeneralReport/Statistics/ApprovedReport")
        )}
      />
      <Route
        path={`${match.url}/general-reports`}
        component={asyncComponent(() =>
          import("./GeneralReport/GeneralReport")
        )}
      />
      {/* <Route
        path={`${match.url}/harmonyApp-accounts`}
        component={asyncComponent(() =>
          import("./GeneralReport/Statistics/HarmonyAccount")
        )}
      />
      <Route
        path={`${match.url}/harmonyPayApp-accounts`}
        component={asyncComponent(() =>
          import("./GeneralReport/Statistics/HarmonyPayAccount")
        )}
      /> */}
      <Route
        path={`${match.url}/batchs/detail`}
        component={asyncComponent(() => import("./Batch/BatchDetail"))}
      />
      <Route
        path={`${match.url}/batchs`}
        component={asyncComponent(() => import("./Batch/Batch"))}
      />
    </Switch>
  </div>
);

export default Reports;
