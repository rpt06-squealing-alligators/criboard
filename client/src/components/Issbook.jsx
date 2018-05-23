import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/index.css'

class Issbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <h3>Issues Booking</h3>
        <input placeholder="Search for repairmen"></input>
        <div>List of Yellow Pages Repairment</div>
        <div>Calendar</div>
      </div>
    )
  }
}

export default Issbook;



//calendar:
//https://www.cronofy.com/developers/tutorials/getting-started/

//catalogue:
// https://www.sitepoint.com/amazon-product-api-exploration-lets-build-a-product-search/