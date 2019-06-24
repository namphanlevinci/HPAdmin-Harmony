import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Merchants = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`}/>
      <Route path={`${match.url}/list`} component={asyncComponent(() => import('./MerchantsList/merchantsList'))}/>
      <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./MerchantProfile/MerchantProfile'))}/>
      <Route path={`${match.url}/requests`} component={asyncComponent(() => import('./MerchantsRequest/MerchantsRequest'))}/>
    </Switch>
  </div>
);

export default Merchants;