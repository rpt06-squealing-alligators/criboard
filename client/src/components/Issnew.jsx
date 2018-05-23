import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'formstone';
import 'formstone/dist/js/core.js';
import 'formstone/dist/css/background.css';
import 'formstone/dist/js/upload.js';
import 'formstone/dist/css/upload.css';
import 'formstone/dist/css/themes/light.css';
import 'formstone/dist/js/core.js';;

class Issnew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    $('.upload').upload({
      action: '/issues'
    });
  }

  render() {
    return(
      <div>
      <input className="input" placeholder="Title . . ."></input>
      <input className="input" placeholder="Description"></input>
      <div className="input upload" placeholder="Upload image"></div>
      </div>
    )
  }
}

export default Issnew;