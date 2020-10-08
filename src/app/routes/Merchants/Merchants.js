import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import PrivateRoute from "../../PrivateRoute";

const Merchants = ({ match, location }) => {
  return (
    // <CSSTransition timeout={300} classNames="fade">
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />

        {/* ADD MERCHANT V2 */}
        <PrivateRoute
          permissionID={12}
          path={`${match.url}/add`}
          component={asyncComponent(() =>
            import("./MerchantsList/AddMerchants/AddMerchant")
          )}
        />

        <PrivateRoute
          permissionID={11}
          path={`${match.url}/list`}
          component={asyncComponent(() => import("./MerchantsList/Merchants"))}
        />

        <Route
          path={`${match.url}/profile/product/add`}
          component={asyncComponent(() =>
            import("./MerchantProfile/Detail/Product/productAdd")
          )}
          location={location}
          match={match}
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

        <PrivateRoute
          permissionID={7}
          path={`${match.url}/approved`}
          component={asyncComponent(() =>
            import("./MerchantsList/merchantsList")
          )}
        />

        <PrivateRoute
          permissionID={4}
          path={`${match.url}/pending/profile/edit`}
          component={asyncComponent(() =>
            import("./MerchantsRequest/EditPending/EditPendingMerchant")
          )}
        />
        <Route
          path={`${match.url}/pending/profile`}
          component={asyncComponent(() =>
            import("./MerchantsRequest/MerchantReqProfile")
          )}
        />
        <PrivateRoute
          permissionID={3}
          path={`${match.url}/pending`}
          component={asyncComponent(() =>
            import("./MerchantsRequest/MerchantsRequest")
          )}
        />

        <PrivateRoute
          permissionID={9}
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
        <PrivateRoute
          permissionID={8}
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
