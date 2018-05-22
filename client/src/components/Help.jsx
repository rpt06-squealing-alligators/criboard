import React from 'react';
import ReactDOM from 'react-dom';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <h3>Help</h3>
        <ul>
          <li>Navigation map</li>
          <li>General info about using the app</li>
          <li>Link to github page</li>
        </ul>
      </div>
    )
  }
}

export default Help;