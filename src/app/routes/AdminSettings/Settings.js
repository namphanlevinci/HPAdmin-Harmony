import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Accounts = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      <Route path={`${match.url}/smtp`} component={asyncComponent(() => import('./SMTP/smtp'))}/>
      <Route path={`${match.url}/template`} component={asyncComponent(() => import('./Template/template'))}/>
      <Route path={`${match.url}/twilio`} component={asyncComponent(() => import('./Twilio/twilio'))}/>
    </Switch>
  </div>
);

export default Accounts;