import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import BackGround from '../assets/images/landing.jpg';

var landingStyle = {
  backgroundSize: "cover",
  backgroundImage: `url(${BackGround})`,
  height: "100vh"
}

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
      <div style={landingStyle}>
        <h1 className="display-4">Criboard</h1>
        <p className="lead">An app to track/split monthly expenses, maintenance issues, etc. and help roommates and landlords stay organized.</p>
        <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a><br/><br/>
        <a className="btn btn-primary btn-lg" href="/signup" role="button">Signup</a>
      </div>
      </div>
    );
  }

}

export default Landing;