import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/index.css'

class Issupplies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <h3>Issues Supplies Catalogue</h3>
        <input placeholder="Search for supplies"></input>
        <div>List of supplies</div>
      </div>
    )
  }
}

export default Issupplies;