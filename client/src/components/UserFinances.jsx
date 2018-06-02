import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from '../components/Home.jsx';
// import '../assets/images/whiteboard.jpg'

class UserFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      groupInfo: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get('/getuserinfo')
      .then(result => {
        // console.log('logged in user', result);
        this.setState({
          user: result.data.username,
          groupInfo: result.data.groupInfo
        });
      })
  }

  onClick(groupname, user1, user2) {
    console.log('button clicked', groupname, user1, user2)
    var params = {
      groupname: groupname,
      user1: user1,
      user2: user2
    };
    axios.post('/settleup', params)
      .then(result => {
        console.log(result);
        axios.get('/getuserinfo')
        .then(result => {
          // console.log('logged in user', result);
          this.setState({
            user: result.data.username,
            groupInfo: result.data.groupInfo
          });
        })
      })
  }

  render() {
    // if no groups, render that user is not in any groups yet
    if(this.state.groupInfo.length === 0) {
      return(<div>User is not in any groups yet</div>)
    }
    var toRender = [<Home key={0}/>];
    // var toRender = [];
    var user = this.state.user;
    var groupInfo = this.state.groupInfo;
    console.log('user, groupInfo', user, groupInfo)

    for (var i = 0; i < groupInfo.length; i++) {
      var members = groupInfo[i].groupmembers;
      var row = groupInfo[i].row;
      var user1 = members.indexOf(user);
      var groupname = groupInfo[i].groupname;
      if (row !== null) {
        var itemsOwedByUser = members.map((item, j) => {
          if (row[j] > 0) {
            var user1 = members.indexOf(this.state.user);
            var group = groupInfo[i].groupname;
            return (
              <tr key={j}>
                <td>{user} owes ${row[j]} to {item}<button className="settle btn btn-primary" onClick={() => this.onClick(group, user1, j)}>Settle Up</button></td>
              </tr>
            );
          }
        });
        var itemsOwedToUser = members.map((item, j) => {
          if (row[j] < 0) {
            var user1 = members.indexOf(this.state.user);
            var group = groupInfo[i].groupname;
            return (
              <tr key={j}>
                <td> {user} is owed ${Math.abs(row[j])} by {item}<button className="settle btn btn-primary" onClick={() => this.onClick(group, user1, j)}>Settle Up</button></td>
              </tr>
            );
          }
        });
      }
      toRender[i + 1] = (<div key={i + 1} className="container">
        <h1>In {groupname} group</h1>
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
      );
    }
  // return toRender
  return (
    toRender
  );
  }

}

export default UserFinances;