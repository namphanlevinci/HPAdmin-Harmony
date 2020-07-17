import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const Merchants = ({ match, location }) => {
  return (
    // <CSSTransition timeout={300} classNames="fade">
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
        <Route
          path={`${match.url}/add`}
          component={asyncComponent(() =>
            import("./MerchantsList/addMerchant/addMerchant")
          )}
        />
        <Route
          path={`${match.url}/list`}
          component={asyncComponent(() => import("./MerchantsList/Merchants"))}
        />
        <Route
          path={`${match.url}/profile`}
          component={asyncComponent(() =>
            import("./MerchantProfile/MerchantProfile")
          )}
          location={location}
          match={match}
        />
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
        <Route
          path={`${match.url}/pending/profile/edit`}
          component={asyncComponent(() =>
            import("./MerchantsRequest/EditPendingMerchant")
          )}
        />
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
        <Route
          path={`${match.url}/staff`}
          component={asyncComponent(() =>
            import("./MerchantProfile/Detail/Staff/staff-detail/staff-info")
          )}
        />
      </Switch>
    </div>
    // </CSSTransition>
  );
};

export default Merchants;
