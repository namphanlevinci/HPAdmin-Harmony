import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Consumers = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      {/* MERCHANT LIST  */}
      <Route path={`${match.url}/list`} component={asyncComponent(() => import('./Consumers'))}/>
      <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./ConsumerProfile/ConsumerProfile'))}/>
    </Switch>
  </div>
);

export default Consumers;