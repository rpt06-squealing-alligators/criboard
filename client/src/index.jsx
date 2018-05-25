import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Budget from './components/Budget.jsx';
import Issues from './components/Issues.jsx';
import Issbook from './components/Issbook.jsx';
import Issupplies from './components/Issupplies.jsx';
import Lease from './components/Lease.jsx';

import Account from './components/Account.jsx';
import Group from './components/Group.jsx';
import Help from './components/Help.jsx';
import Logout from './components/Logout.jsx';
import Signup from './components/Signup.jsx';
import './assets/styles/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true
    }
    this.hideDashboard = this.hideDashboard.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
  }

  hideDashboard() {
    this.setState({dashboard: false});
    this.forceUpdate();
  }

  showDashboard() {
    this.setState({dashboard: true});
    this.forceUpdate();
  }

  render() {
    return (
      <div>
      {/*<Signup  />*/}
      <Router>
        <div className="main grid">
          <div className="dashboard">
            {this.state.dashboard && <Route exact path="/" component={Dashboard}/>}
            <Route path="/budget" component={Budget}/>
            <Route path="/issues" component={Issues}/>
            <Route path="/book" component={Issbook}/>
            <Route path="/supplies" component={Issupplies}/>
            <Route path="/lease" component={Lease}/>

            <Route path="/account" component={Account}/>
            <Route path="/group" component={Group}/>
            <Route path="/help" component={Help}/>
            <Route path="/logout" component={Logout}/>

          </div>
          <div className="navs">
            <div className="dropdown">
              <button className="dropbtn glyphicons glyphicons-user">Account</button>
              <div className="dropdown-content">
                <Link to="/account">
                  <div onClick={this.hideDashboard}>Account</div>
                </Link>
                <Link to="/group">
                  <div onClick={this.hideDashboard}>Create Group</div>
                </Link>
                <Link to="/help">
                  <div onClick={this.hideDashboard}>Help</div>
                </Link>
                <Link to="/logout">
                  <div onClick={this.hideDashboard}>Logout</div>
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn glyphicons glyphicons-menu-hamburger">Sidebar</button>
              <div className="dropdown-content">
                <Link to="/">
                  <div onClick={this.showDashboard}>Dashboard</div>
                </Link>
                <Link to="/budget">
                  <div onClick={this.hideDashboard}>Budget (activity, billpay)</div>
                </Link>
                <Link to="/issues">
                  <div onClick={this.hideDashboard}>Issues</div>
                </Link>
                <Link to="/lease">
                  <div onClick={this.hideDashboard}>Lease (and other documents)</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Router>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('root'))