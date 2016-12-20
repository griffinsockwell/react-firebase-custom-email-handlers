import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Action from './components/Action';
import App from './components/App';
import Home from './components/Home';
import Landing from './components/Landing';
import UpdateEmail from './components/UpdateEmail';
import UpdatePassword from './components/UpdatePassword';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="/home">
        <IndexRoute component={Home} />
        <Route path="/home/update-email" component={UpdateEmail} />
        <Route path="/home/update-password" component={UpdatePassword} />
      </Route>
      <Route path="/action" component={Action} />
    </Route>
  </Router>,
  document.getElementById('root')
);
