import React from 'react';
import axios from 'axios';
import Home from '../components/Home.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { Button } from 'react-bootstrap';

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: '',
      amount: '',
      users: [],
      user: '',
      date: moment()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    axios.get(`/fetchusers/${this.props.group}`)
      .then((result) => {
        // console.log(result)
        this.setState({
          users: result.data,
          user: result.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSubmit() {
    var data = {
      groupname: this.props.group,
      bill: this.state.bill,
      amount: this.state.amount,
      date: this.state.date,
      user: this.state.user
    };
    axios.post('/addtransaction', data)
    .then(res => {
      // console.log(res)
      alert(`Transaction has been posted in ${this.props.group} group.`);
      this.setState({
        bill: '',
        amount: '',
        user: ''
      });
    });
  }

  handleChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    let optionItems = this.state.users.map(user => {
      return (
        <option key={user}>
          {user}
        </option>
      );
    });
    return (
      <div>
        <div className="jumbotron">
          <h4 className="display-4">Enter a transaction for {this.props.group} group</h4>
          <div className="form-group">
            <label>Bill</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter bill" name="bill" value={this.state.bill} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Amount</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter amount" name="amount" value={this.state.amount} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Paid on</label>&nbsp;&nbsp;
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Paid by</label>&nbsp;&nbsp;
            <select className="form-control" name="user" value={this.state.user} onChange={this.onChange.bind(this)} >
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

export default AddTransaction;