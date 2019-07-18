import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Business = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`}/>
      <Route path={`${match.url}/questions`} component={asyncComponent(() => import('./Questions/Questions'))}/>
    </Switch>
  </div>
);

export default Business;