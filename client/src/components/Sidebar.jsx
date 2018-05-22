import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Issues from './Issues.jsx';;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <h3>Sidebar</h3>
      <Router>
        <ul>
          <li>Budget (activity, billpay)</li>
          <Link to="/issues">
          <li>Issues</li>
          </Link>
          <li>Lease (and other documents)</li>
        </ul>
      </Router>
      </div>
    )
  }
}

export default Sidebar;