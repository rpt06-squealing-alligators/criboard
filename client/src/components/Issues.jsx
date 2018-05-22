import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Newissue from './Newissue.jsx';
import '../assets/styles/index.css'

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      showReportButton: false
    }
    this.showReport = this.showReport.bind(this);
    this.displayReportButton = this.displayReportButton.bind(this);
  }

  showReport() {
    this.setState({report: true})
  }

  displayReportButton() {
    this.setState({showReportButton: !this.state.showReportButton})
  }

  render() {
    return(
      <Router>
      {this.state.report ? <Newissue /> :
      <div className="issues grid">
        <h3 className="reports" onMouseEnter={this.displayReportButton}>Reports</h3>
          {
            this.state.showReportButton &&
            <button className="reports-body" onClick={this.showReport}>Report New Issue</button>
          }
        <h3 className="scheduled">Scheduled</h3>
        <h3 className="ip">In Progress</h3>
        <h3 className="fixed">Fixed</h3>
      </div>}
      </Router>
    )
  }
}

export default Issues;