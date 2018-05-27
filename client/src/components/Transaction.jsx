import React from 'react';
import axios from 'axios';
import Home from '../components/Home.jsx';

import { Button } from 'react-bootstrap';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: '',
      amount: '',
      person: '',
      people: []
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    axios.get('/fetchusers')
      .then((result) => {
        // console.log(result)
        this.setState({
          people: result.data,
          person: result.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSubmit() {
    axios.post('/addtransaction', this.state)
    .then(res => {
      // console.log(res)
      alert('Transaction has been posted');
    });
  }

  render() {
    let optionItems = this.state.people.map(person => {
      return (
        <option key={person}>
          {person}
        </option>
      );
    });
    return (
      <div>
        <Home />
        <div className="jumbotron">
          <h1 className="display-4">Enter a transaction</h1>
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
            <select className="form-control" name="person" value={this.state.person} onChange={this.onChange.bind(this)} >
              {optionItems}
            </select>
          </div>
          <Button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
        </div>
      </div>
    );
  }
}

//datepicker:
//https://jqueryui.com/datepicker/

export default Transaction;