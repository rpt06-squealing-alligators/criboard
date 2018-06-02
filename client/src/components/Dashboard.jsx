import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
// import '../assets/images/whiteboard.jpg'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '123 Main St',
      cityState: 'Springfield, MA 01105',
      whiteboard: 'Hey guys, Am going to be out of town next Monday! Someone pick up my chores? --Sam',
      user: ''
    };
  }

  componentDidMount() {
    axios.get('/getuser')
    .then(result => {
      this.setState({
        user: result.data
      });
    });
    var mymap = L.map('mapid').setView([42.09, -72.58], 15);
    var marker = L.marker([42.09, -72.58]).addTo(mymap);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjamh2aXMwODcwem5uM2twMzA3cmZsbnBvIn0.rz3s-qyoAcFzzrOd91YdYg'
    }).addTo(mymap);
  }

  render() {
    return(
      <div>
      <Nav />
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