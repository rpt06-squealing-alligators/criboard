import React from 'react';
import ReactDOM from 'react-dom';

class Issues extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="grid">
        <h3>Reports</h3>
        <h3>Scheduled</h3>
        <h3>In Progress</h3>
        <h3>Fixed</h3>
      </div>
    )
  }
}

export default Issues;