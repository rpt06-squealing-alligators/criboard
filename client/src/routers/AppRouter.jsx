import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Landing from '../components/Landing.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Issues from '../components/Issues.jsx';
import Issbook from '../components/Issbook.jsx';
import Issupplies from '../components/Issupplies.jsx';
import Address from '../components/Address.jsx';
import Group from '../components/Group.jsx';
import Help from '../components/Help.jsx';
import PickGroup from '../components/PickGroup.jsx';
import DeleteGroup from '../components/DeleteGroup.jsx';
import AddTransaction from '../components/AddTransaction.jsx';
import UserFinances from '../components/UserFinances.jsx';
import Activity from '../components/Activity.jsx';

import Logout from '../components/Logout.jsx';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path="/issues" component={Issues}/>
      <Route exact path="/book" component={Issbook}/>
      <Route exact path="/supplies" component={Issupplies}/>
      <Route exact path="/address" component={Address}/>
      <Route exact path="/group" component={Group}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/pickgroup" component={PickGroup}/>
      <Route exact path="/deletegroup" component={DeleteGroup}/>
      <Route exact path="/activity" component={Activity}/>
      <Route exact path="/userfinances" component={UserFinances}/>
      <Route exact path="/logout" component={Logout}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;