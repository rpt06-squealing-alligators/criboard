import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Landing from '../components/Landing.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Home from '../components/Home.jsx';
import Budget from '../components/Budget.jsx';
import Issues from '../components/Issues.jsx';
import Issbook from '../components/Issbook.jsx';
import Issupplies from '../components/Issupplies.jsx';
import Lease from '../components/Lease.jsx';
import Account from '../components/Account.jsx';
import Group from '../components/Group.jsx';
import Help from '../components/Help.jsx';

import Logout from '../components/Logout.jsx';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/home' component={Home}/>
      <Route exact path="/budget" component={Budget}/>
      <Route exact path="/issues" component={Issues}/>
      <Route exact path="/book" component={Issbook}/>
      <Route exact path="/supplies" component={Issupplies}/>
      <Route exact path="/lease" component={Lease}/>
      <Route exact path="/account" component={Account}/>
      <Route exact path="/group" component={Group}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/logout" component={Logout}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;