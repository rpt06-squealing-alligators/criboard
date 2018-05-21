import React from 'react';
import ReactDOM from 'react-dom';

class Newissue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <input className="input" placeholder="Title . . ."></input>
      <input className="input" placeholder="Description"></input>
      <input className="input" placeholder="Upload image"></input>
      </div>
    )
  }
}

//https://formstone.it/components/upload/

export default Newissue;