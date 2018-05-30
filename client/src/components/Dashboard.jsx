import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from '../components/Home.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      finances: [],
      groupUsers: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get('/getuserinfo')
      .then(result => {
        // console.log('logged in user', result.data);
        this.setState({
          user: result.data.username,
          finances: result.data.row,
          groupUsers: result.data.users
        });
      })
  }

  onClick(i) {
    // console.log('button clicked', this.state.user, i)
    var params = {
      user1: this.state.user,
      user2: i
    };
    axios.post('/settleup', params)
      .then(result => {
        // console.log(result);
        axios.get('/getuserinfo')
          .then(result => {
            // console.log('logged in user', result.data);
            this.setState({
              user: result.data.username,
              finances: result.data.row,
              groupUsers: result.data.users
            });
          })
        })
  }

  render() {
    if (this.state.finances !== null) {
      var itemsOwedByUser = this.state.groupUsers.map((item, i) => {
        if (this.state.finances[i] > 0) {
          return (
            <tr key={i}>
              <td>{this.state.user} owes ${this.state.finances[i]} to {item}<button className="settle" onClick={() => this.onClick(i)}>Settle Up</button></td>
            </tr>
          );
        }
      });
      var itemsOwedToUser = this.state.groupUsers.map((item, i) => {
        if (this.state.finances[i] < 0) {
          return (
            <tr key={i}>
              <td> {this.state.user} is owed ${Math.abs(this.state.finances[i])} by {item}<button className="settle" onClick={() => this.onClick(i)}>Settle Up</button></td>
            </tr>
          );
        }
      });
    }

    return(
      <div>
      <Home />
      <h3>Dashboard for {this.state.user}</h3>
      <ul>
        <li>Map with address</li>
        <li>Notifications</li>
        <li>User specific info</li>
        <li>Whiteboard</li>
      </ul>
      <div className="table-responsive col-md-6">
        <table className="table table-hover">
          <thead><tr><th>{this.state.user} Owes</th></tr></thead>
            <tbody>
            {itemsOwedByUser}
          </tbody>
        </table>
      </div>
      <div className="table-responsive col-md-6">
        <table className="table table-hover">
          <thead><tr><th>{this.state.user} is Owed</th></tr></thead>
            <tbody>
            {itemsOwedToUser}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

export default Dashboard;