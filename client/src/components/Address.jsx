import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Nav from './Nav.jsx';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    var address = `${this.state.street}; ${this.state.city}, ${this.state.state} ${this.state.zipcode}`
    var getCoordinates = function(address) {
      var geocoder =  new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var data = {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
            address: address
          };
          axios.post('/postaddress', data)
          .then(result => {
            alert('Address has been saved');
          })
        } else {
          // console.log(status);
        }
      });
    }
    getCoordinates(address);
  }

  render() {
    return(
      <div>
      <Nav />
      <div className="jumbotron">
        <h3>Enter address</h3>
          <div className="form-group">
            <label>Enter street address</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter street address" name="street" value={this.state.address} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Enter city</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter city" name="city" value={this.state.city} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Enter state</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter state" name="state" value={this.state.state} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Enter zipcode</label>&nbsp;&nbsp;
            <input type="text" className="form-control" placeholder="Enter zipcode" name="zipcode" value={this.state.zipcode} onChange={this.onChange.bind(this)} />
          </div>
          <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</button>
      </div>
      </div>
    )
  }
}

export default Address;
