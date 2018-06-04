import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupname: null,
      number: null,
      indices: [],
      previousTab: 0,
      currentTab: 0,
      users: [],
      user: ''
    }
    this.showTab = this.showTab.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onNumChange = this.onNumChange.bind(this);
  }

  componentDidMount() {
    this.showTab(this.state.currentTab);
    axios.get('/fetchusers')
    .then((result) => {
      this.setState({
        users: result.data,
        user: result.data[0]
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  showTab() {
    var tabs = Object.keys(this.refs);
    var prev = this.refs[tabs[this.state.previousTab]];
    var curr = this.refs[tabs[this.state.currentTab]];
    prev.style.display = "none";
    curr.style.display = "block";
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onNumChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      var indices = Array.from({length: this.state.number}, (v, k) => k+1)
      this.setState({indices: indices})
    });
  }

  nextPrev(pg) {
    if((this.state.currentTab + pg > -1) && (this.state.currentTab + pg < 2)) {
      this.setState({previousTab: this.state.currentTab, currentTab: this.state.currentTab + pg}, this.showTab);
    }
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
        <Nav />
          <div className="jumbotron">
            <form id="regForm" method="POST" onSubmit={() => alert('Your group has been created')}>
            <h3>Create a Group</h3>
            <div className="tab" ref="numberTab">
            <label>Name of the group</label>
              <p><input placeholder="Enter group name" name="groupname" onChange={this.onNumChange}/></p>
            <label>Number of group members</label>
              <p><input placeholder="Enter number" name="number" onChange={this.onNumChange}/></p>
            </div>
            <div className="tab" ref="nameTab"><label>Select members</label>
              {this.state.indices.map(i =>
              <p key={i}><select className="form-control" name="user" placeholder="name">{optionItems}</select></p>)}
            </div>
            <div>
              <div>
                <button className="btn btn-primary" type="button" id="prevBtn" onClick={() => this.nextPrev(-1)} disabled={this.state.currentTab <= 0 ? true : false}>Previous</button>&nbsp;&nbsp;
                <button className="btn btn-primary" type="button" id="nextBtn" onClick={() => this.nextPrev(1)} disabled={this.state.currentTab >= 1 || this.state.number < 1 || !this.state.groupname ? true : false}>Next</button>&nbsp;&nbsp;
                {this.state.currentTab > 0 && <input type="submit" className="btn btn-primary"></input>}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Group;