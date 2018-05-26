import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <Home />
      <h3>Dashboard</h3>
        <ul>
          <li>Map with address</li>
          <li>Notifications</li>
          <li>User specific info</li>
          <li>Whiteboard</li>
        </ul>
      </div>
    )
  }
}

export default Dashboard;