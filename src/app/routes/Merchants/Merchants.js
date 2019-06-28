import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Merchants = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      <Route path={`${match.url}/list`} component={asyncComponent(() => import('./MerchantsList/merchantsList'))}/>
      <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./MerchantProfile/MerchantProfile'))}/>
      <Route path={`${match.url}/requests`} component={asyncComponent(() => import('./MerchantsRequest/MerchantsRequest'))}/>
      <Route path={`${match.url}/pending-profile`} component={asyncComponent(() => import('./MerchantsRequest/MerchantReqProfile'))}/>
    </Switch>
  </div>
);

export default Merchants;