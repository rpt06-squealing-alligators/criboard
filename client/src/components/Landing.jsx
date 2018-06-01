import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('/getuser')
      .then(result => {
        // console.log('logged in user', result.data)
        var loggedIn = (result.data !== '');
        this.setState({
          loggedIn: loggedIn
        });
      })
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to="/dashboard" />
        <Redirect to="/home" />
// Any attempt to go to landing page should take a logged in user to homepage
//Add styles; when user logs in, redirect to dashboard
      );
    }
    return (
      <div className="jumbotron">
        <h1 className="display-4">Criboard</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a><br/><br/>
        <a className="btn btn-primary btn-lg" href="/signup" role="button">Signup</a>

      </div>

    );
  }

}

export default Landing;