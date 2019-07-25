import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Merchants = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      {/* MERCHANT LIST  */}
      <Route path={`${match.url}/list`} component={asyncComponent(() => import('./MerchantsList/Merchants'))}/>
      <Route path={`${match.url}/merchant-profile`} component={asyncComponent(() => import('./MerchantProfile/MerchantProfile2'))}/>
      {/* APPROVED LIST  */}
      <Route path={`${match.url}/approved-profile`} component={asyncComponent(() => import('./MerchantRejectList/MerchantApprovedProfile'))}/>
      <Route path={`${match.url}/approved-request`} component={asyncComponent(() => import('./MerchantsList/merchantsList'))}/>
      {/* PENDING LIST */}
      <Route path={`${match.url}/pending-request`} component={asyncComponent(() => import('./MerchantsRequest/MerchantsRequest'))}/>
      <Route path={`${match.url}/pending-profile`} component={asyncComponent(() => import('./MerchantsRequest/MerchantReqProfile'))}/>
      {/* REJECTED LIST */}
      <Route path={`${match.url}/rejected-profile`} component={asyncComponent(() => import('./MerchantRejectList/MerchantRejectedProfile'))}/>
      <Route path={`${match.url}/rejected-request`} component={asyncComponent(() => import('./MerchantRejectList/MerchantsRejectedList'))}/>
    </Switch>
  </div>
);

export default Merchants;