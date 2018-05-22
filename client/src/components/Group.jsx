import React from 'react';
import ReactDOM from 'react-dom';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <h3>Group</h3>
        <ul>
          <li>Set up a new group</li>
        </ul>
      </div>
    )
  }
}

export default Group;