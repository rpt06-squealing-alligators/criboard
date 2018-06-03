import React from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction.jsx';
import Nav from './Nav.jsx';

class DeleteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      group: ''
    };
  }

  componentDidMount() {
    // get groups for logged in user
    axios.get('/groups')
    .then(result => {
      this.setState({
        groups: result.data,
        group: result.data[0]
      });
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    var data = {
      group: this.state.group
    };
    axios.post('/deletegroup', data)
    .then(result => {
      alert('Group has been deleted');
    })
  }

  render() {
    let optionItems = this.state.groups.map((group, i) => {
      return (
        <option key={i}>
          {group}
        </option>
      );
    });
    return (
      <div>
        <Nav />
        <div className="jumbotron">
        <h3>Delete Group</h3>
          <div className="form-group">
          <label>Pick a Group to delete</label>&nbsp;&nbsp;
          <select className="form-control" name="group" value={this.state.group} onChange={this.onChange.bind(this)} >
            {optionItems}
          </select>
          </div>
          <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</button>
      </div>
      </div>
    );
  }
}

export default DeleteGroup;