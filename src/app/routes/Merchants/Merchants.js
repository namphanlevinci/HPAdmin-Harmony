import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Merchants = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      <Route path={`${match.url}/accepted-list`} component={asyncComponent(() => import('./MerchantsList/merchantsList'))}/>
      <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./MerchantProfile/MerchantProfile2'))}/>
      <Route path={`${match.url}/requests`} component={asyncComponent(() => import('./MerchantsRequest/MerchantsRequest'))}/>
      <Route path={`${match.url}/pending-profile`} component={asyncComponent(() => import('./MerchantsRequest/MerchantReqProfile'))}/>
      <Route path={`${match.url}/rejected-profile`} component={asyncComponent(() => import('./MerchantRejectList/MerchantRejectedProfile'))}/>
      <Route path={`${match.url}/rejected-list`} component={asyncComponent(() => import('./MerchantRejectList/MerchantsRejectedList'))}/>
    </Switch>
  </div>
);

export default Merchants;