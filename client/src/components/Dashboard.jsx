import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from '../components/Home.jsx';
// import '../assets/images/whiteboard.jpg'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '123 Main St',
      cityState: 'Springfield, MA 01105',
      whiteboard: 'Hey guys, Am going to be out of town next Monday! Someone pick up my chores? --Sam'
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    var mymap = L.map('mapid').setView([42.09, -72.58], 15);
    var marker = L.marker([42.09, -72.58]).addTo(mymap);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjamh2aXMwODcwem5uM2twMzA3cmZsbnBvIn0.rz3s-qyoAcFzzrOd91YdYg'
    }).addTo(mymap);
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
    return(
      <div>
      <Home />
      <div className="jumbotron">
        <h3>Dashboard for {this.state.user}</h3>
        <div id="mapid"></div>
        <ul className="dashboard-bullets">
          <li>{this.state.address}; {this.state.cityState}</li>
          <li>Notifications</li>
          <li>User specific info</li>
        </ul>
        <textarea className="whiteboard" name="message" rows="10" cols="30" defaultValue={this.state.whiteboard}></textarea>
      </div>
      </div>
    )
  }
}

export default Dashboard;