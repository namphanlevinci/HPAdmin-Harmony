import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Accounts = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`}/>
      <Route path={`${match.url}/users`} component={asyncComponent(() => import('./Users/Users'))}/>
      <Route path={`${match.url}/roles`} component={asyncComponent(() => import('./Roles/Roles'))}/>
      <Route path={`${match.url}/logs`} component={asyncComponent(() => import('./Logs/Logs'))}/>
      {/* <Route path={`${match.url}/requests/profile`} component={asyncComponent(() => import('./MerchantsRequest/MerchantReqProfile'))}/> */}
    </Switch>
  </div>
);

export default Accounts;