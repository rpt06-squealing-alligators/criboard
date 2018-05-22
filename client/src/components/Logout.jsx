import React from 'react';
import ReactDOM from 'react-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <h3>Logout</h3>
        <ul>
          <li>YOU'VE BEEN LOGGED OUT</li>
        </ul>
      </div>
    )
  }
}

export default Logout;