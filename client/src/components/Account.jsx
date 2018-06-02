import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Nav from './Nav.jsx';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '123 Main St',
      cityState: 'Springfield, MA 01105'
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
      <Nav />
      <div className="jumbotron">
      <h3>Account</h3>
        <ul>
          <li>Profile picture</li>
          <li>Apartment address is: {this.state.address}; {this.state.cityState}</li>
        </ul>
      </div>
      </div>
    )
  }
}

export default Account;