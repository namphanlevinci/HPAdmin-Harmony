import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import asyncComponent from "../../../util/asyncComponent";
import PrivateRoute from "../../PrivateRoute";

const Merchants = ({ match, location }) => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />

        <PrivateRoute
          permissionID={12}
          path={`${match.url}/add`}
          component={asyncComponent(() =>
            import("./MerchantList/AddMerchants/AddMerchant")
          )}
        />

        <PrivateRoute
          permissionID={11}
          path={`${match.url}/list`}
          component={asyncComponent(() => import("./MerchantList/Merchants"))}
        />

        <Route
          path={`${match.url}/profile/product/add`}
          component={asyncComponent(() =>
            import("./MerchantList/Profile/Product/ProductAdd")
          )}
          match={match}
          location={location}
        />

        <Route
          path={`${match.url}/profile`}
          component={asyncComponent(() =>
            import("./MerchantList/MerchantProfile")
          )}
          location={location}
          match={match}
        />
        <Route
          path={`${match.url}/approved/profile`}
          component={asyncComponent(() =>
            import("./ApprovedList/MerchantApprovedProfile")
          )}
        />

        <PrivateRoute
          permissionID={7}
          path={`${match.url}/approved`}
          component={asyncComponent(() =>
            import("./ApprovedList/ApprovedList")
          )}
        />

        <PrivateRoute
          permissionID={4}
          path={`${match.url}/pending/profile/edit`}
          component={asyncComponent(() =>
            import("./PendingList/EditPendingProfile")
          )}
        />
        <Route
          path={`${match.url}/pending/profile`}
          component={asyncComponent(() =>
            import("./PendingList/PendingProfile")
          )}
        />
        <PrivateRoute
          permissionID={3}
          path={`${match.url}/pending`}
          component={asyncComponent(() => import("./PendingList/PendingList"))}
        />

        <PrivateRoute
          permissionID={9}
          path={`${match.url}/rejected/profile/edit`}
          component={asyncComponent(() =>
            import("./RejectList/EditMerchantRejected")
          )}
        />
        <Route
          path={`${match.url}/rejected/profile`}
          component={asyncComponent(() =>
            import("./RejectList/MerchantRejectedProfile")
          )}
        />
        <PrivateRoute
          permissionID={8}
          path={`${match.url}/rejected`}
          component={asyncComponent(() => import("./RejectList/RejectedList"))}
        />
        <Route
          path={`${match.url}/staff`}
          component={asyncComponent(() =>
            import("./MerchantList/Profile/Staff/Profile/Staff")
          )}
        />
      </Switch>
    </div>
  );
};

export default Merchants;
