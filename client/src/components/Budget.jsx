import React from 'react';
import ReactDOM from 'react-dom';

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <h3>Budget</h3>
        <ul>
          <li>Billpay</li>
          <li>Graphs</li>
          <li>Expenses</li>
          <li>Receipts</li>
        </ul>
      </div>
    )
  }
}

export default Budget;