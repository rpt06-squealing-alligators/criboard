import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      onHomePage: false,
      onLandingPage: false
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    console.log(this.state)
    if (this.state.username === '' || this.state.password === '')  {
      alert('username, email and password fields cannot be empty. Enter new values');
      // TODO - redirect to signup page
    }
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('./loginuser', data)
      .then(result => {
        console.log(result);
        // clear input fields
        this.setState({
          email: '',
          password: ''
        });
        if (result.data === 'user logged in') {
          alert(`${this.state.username} has been logged in`);
          // TODO - redirect to Home page - which is one of the restricted pages
          this.setState({
            onHomePage: true
          })
        } else {
          alert('Incorrect username and/or password. Please signup/login');
          // TODO - redirect to landing page
          this.setState({
            onLandingPage: true
          })

        }
      })
      .catch(err => {
        console.log(err);
      })

  }

  render() {
    if (this.state.onHomePage) {
      return (
        <Redirect to="/home" />
      );
    }
    if (this.state.onLandingPage) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="jumbotron">
      <h1 className="display-4">Login</h1>
        <div className="form-group">
          <label>Username</label>&nbsp;&nbsp;
          <input type="email" className="form-control" placeholder="Enter username" name="username" value={this.state.usernamel} onChange={this.onChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>Password</label>&nbsp;&nbsp;
          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
        </div>
        <Button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
      </div>
    );
  }
}

export default Login;