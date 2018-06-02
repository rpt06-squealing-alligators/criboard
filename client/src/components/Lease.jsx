import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class Lease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <Nav />
      <h3>Lease</h3>
        <ul>
          <li>Lease</li>
          <li>Docusign</li>
          <li>Renter's Insurance</li>
        </ul>
      </div>
    )
  }
}

export default Lease;