import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: '',
      amount: '',
      person: ''
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    axios.post('/addtransaction', this.state)
    .then(res => console.log(res))
    // console.log(this.state)
    // TODO - send info to server

  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Bill</label>&nbsp;&nbsp;
          <input type="text" className="form-control" placeholder="Enter bill you are paying" name="bill" value={this.state.bill} onChange={this.onChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>Amount</label>&nbsp;&nbsp;
          <input type="text" className="form-control" placeholder="Enter amount" name="amount" value={this.state.amount} onChange={this.onChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>Paid by</label>&nbsp;&nbsp;
          <input type="text" className="form-control" placeholder="Paid by" name="person" value={this.state.person} onChange={this.onChange.bind(this)} />
        </div>
        <Button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
      </div>
    );
  }
}

//datepicker:
//https://jqueryui.com/datepicker/

export default Transaction;