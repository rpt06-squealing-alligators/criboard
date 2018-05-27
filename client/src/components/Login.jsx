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
    if (this.state.username === '' || this.state.password === '')  {
      this.setState({
            onLandingPage: true
      })
    }
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('./loginuser', data)
      .then(result => {
        console.log(result);
        alert(`${this.state.username} is logged in!`)
        if (result) {
          this.setState({
            onHomePage: true
          })
        } else {
          this.setState({
            onLandingPage: true
          })
        }
      })
      .catch(err => {
        alert('Incorrect username and/or password');
        this.setState({
            onLandingPage: true
        })
      })

  }

  render() {
    if (this.state.onHomePage) {
      return (
        <Redirect to="/home" />
      );
    } else if (this.state.onLandingPage) {
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