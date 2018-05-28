import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from '../components/Home.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    axios.get('/getuserinfo')
      .then(result => {
        console.log('logged in user', result.data);
        this.setState({
          user: result.data
        });
      })
  }

  render() {
    return(
      <div>
      <Home />
      <h3>Dashboard for {this.state.user}</h3>
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