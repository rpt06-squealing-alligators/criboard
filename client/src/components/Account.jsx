import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from '../components/Home.jsx';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    axios.get('/getuser')
      .then(result => {
        console.log('logged in user', result.data)
      })
  }

  render() {
    return(
      <div>
      <Home />
      <h3>Account</h3>
        <ul>
          <li>Profile picture</li>
          <li>Settings</li>
        </ul>
      </div>
    )
  }
}

export default Account;