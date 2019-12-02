import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const Merchants = ({ match }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
      {/* ADD MERCHANT */}
      <Route
        path={`${match.url}/add`}
        component={asyncComponent(() =>
          import("./MerchantsList/addMerchant/addMerchant")
        )}
      />
      {/* MERCHANT LIST  */}
      <Route
        path={`${match.url}/list`}
        component={asyncComponent(() => import("./MerchantsList/Merchants"))}
      />
      <Route
        path={`${match.url}/profile`}
        component={asyncComponent(() =>
          import("./MerchantProfile/MerchantProfile2")
        )}
      />
      {/* APPROVED LIST  */}
      <Route
        path={`${match.url}/approved/profile`}
        component={asyncComponent(() =>
          import("./MerchantRejectList/MerchantApprovedProfile")
        )}
      />
      <Route
        path={`${match.url}/approved`}
        component={asyncComponent(() =>
          import("./MerchantsList/merchantsList")
        )}
      />
      {/* PENDING LIST */}
      <Route
        path={`${match.url}/pending/profile`}
        component={asyncComponent(() =>
          import("./MerchantsRequest/MerchantReqProfile")
        )}
      />
      <Route
        path={`${match.url}/pending`}
        component={asyncComponent(() =>
          import("./MerchantsRequest/MerchantsRequest")
        )}
      />

      {/* REJECTED LIST */}
      {/* EDIT REJECTED MERCHANT */}
      <Route
        path={`${match.url}/rejected/profile/edit`}
        component={asyncComponent(() =>
          import("./MerchantRejectList/EditMerchantRejected")
        )}
      />
      <Route
        path={`${match.url}/rejected/profile`}
        component={asyncComponent(() =>
          import("./MerchantRejectList/MerchantRejectedProfile")
        )}
      />
      <Route
        path={`${match.url}/rejected`}
        component={asyncComponent(() =>
          import("./MerchantRejectList/MerchantsRejectedList")
        )}
      />
    </Switch>
  </div>
);

export default Merchants;
