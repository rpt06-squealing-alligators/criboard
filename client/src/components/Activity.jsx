import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from '../components/Home.jsx';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }

  componentDidMount() {
    axios.get('/allactivity')
      .then(result => {
        // console.log('all activity', result.data);
        this.setState({
          transactions: result.data
        })

      })
  }

  render() {
    var items = this.state.transactions.map((item, i) => {
      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{item.bill}</td>
          <td>{item.amount}</td>
          <td>{item.date}</td>
          <td>{item.paidBy}</td>
        </tr>
      );
    })
    return(
      <div>
      <Home />
      <h3>Financial Activity</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bill</th>
              <th scope="col">Amount</th>
              <th scope="col">Paid On</th>
              <th scope="col">Paid By</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Activity;