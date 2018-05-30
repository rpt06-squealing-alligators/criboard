import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import axios from 'axios';
// import Logout from './Logout.jsx';
import '../assets/styles/index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      users: []
    }
    this.hideDashboard = this.hideDashboard.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
  }

  componentDidMount() {
    axios.get('/fetchusers')
    .then((result) => {
      // console.log(result)
      this.setState({
        users: result.data
      });
    })
    .catch(err => {
      console.log(err);
    })
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
   {/* if (this.state.dashboard) {
      return (
        <Dashboard />
      );
    } */}
    return (
      <div>
     {/*<div>
      <h3>This is a test of users' debts</h3>
      {this.state.users.map(user => <div>{user}</div>)}
      </div>*/}
        <div className="main grid">
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
                <Link to="/dashboard">
                  <div onClick={this.showDashboard}>Dashboard</div>
                </Link>
                {/*<Link to="/budget">
                  <div onClick={this.hideDashboard}>Budget (activity, billpay)</div>
                </Link>*/}
                <Link to="/activity">
                  <div onClick={this.hideDashboard}>Show all Activity</div>
                </Link>
                <Link to="/transaction">
                  <div onClick={this.hideDashboard}>Add a transaction</div>
                </Link>
                <Link to="/issues">
                  <div onClick={this.hideDashboard}>Issues</div>
                </Link>
                {/*<Link to="/lease">
                  <div onClick={this.hideDashboard}>Lease (and other documents)</div>
                </Link>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;