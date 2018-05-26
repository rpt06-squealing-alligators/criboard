import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home.jsx';

class Lease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <Home />
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