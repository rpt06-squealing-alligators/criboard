import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <Nav/>
        <div className="jumbotron">
          <h3>Help</h3>
          <a href="https://rpt06-squealing-alligators.github.io/criboard/">Please see our github page for additional information</a>
        </div>
      </div>
    )
  }
}

export default Help;