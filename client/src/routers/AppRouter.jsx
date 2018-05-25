import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Landing from '../components/Landing.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Home from '../components/Home.jsx';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/home' component={Home}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;