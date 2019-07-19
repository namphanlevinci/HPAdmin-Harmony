import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Business = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      <Route path={`${match.url}/questions`} component={asyncComponent(() => import('./Questions/Questions'))}/>
      <Route path={`${match.url}/transactions`} component={asyncComponent(() => import('./Transactions/Transactions'))}/>
      <Route path={`${match.url}/users`} component={asyncComponent(() => import('./Users/User'))}/>

    </Switch>
  </div>
);

export default Business;