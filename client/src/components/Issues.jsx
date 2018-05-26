import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
// import {Collapse} from 'react-collapse';
import $ from 'jquery';
import Issnew from './Issnew.jsx';
import Issbook from './Issbook.jsx';
import Issupplies from './Issupplies.jsx';
import data from '../assets/mockdata.json';
import '../assets/styles/index.css'

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      showReportButton: false,
      showScheduleButton: false,
      showSuppliesButton: false,
      reported: data.filter(issue => issue.status === 'reported'),
      scheduled: data.filter(issue => issue.status === 'scheduled'),
      ip: data.filter(issue => issue.status === 'ip'),
      fixed: data.filter(issue => issue.status === 'fixed')
    }
    this.showReport = this.showReport.bind(this);
    this.displayReportButton = this.displayReportButton.bind(this);
    this.showCatalogue = this.showCatalogue.bind(this);
  }

  componentDidMount() {
    fetch('/data')
    .then(res => JSON.stringify(res))
    .then(jres => console.log(jres))
  }

  showReport() {
    this.setState({report: true})
  }

  displayReportButton() {
    this.setState({showReportButton: !this.state.showReportButton})
  }

  bookRepair() {
    location.href = '/book'
  }

  showCatalogue() {
    location.href = '/supplies'
  }

  addNotes(e) {
    //update description in database
    //update description on page
    console.log('add note')
    console.log($('.notes'))

  }


  render() {
    return(
      <div>
      {this.state.report ? <Issnew /> :
      <div className="issues grid">
        <h3 className="reports" onMouseEnter={this.displayReportButton}>Reports</h3>
          {
            this.state.showReportButton &&
            <button className="report-button" onClick={this.showReport}>Report New Issue</button>
          }
          <ul className="reports-list">
            {this.state.reported.map(issue =>
              <div key={issue.id} className="report-title">
                <h5>{issue.title}</h5>
                  <div>
                    <p>{issue.description}</p>
                    <img src={issue.image}></img>

                    <button className="booking" onClick={this.bookRepair}>Book handyman</button>

                    <button className="supply" onClick={this.showCatalogue}>Get supplies</button>
                  </div>
              </div>)}
          </ul>
        <h3 className="scheduled">Scheduled</h3>
          <ul className="scheduled-list">
             {this.state.scheduled.map(issue =>
                <div key={issue.id} className="scheduled-title">
                  <h5>{issue.title}</h5>
                <div>
                  <p>{issue.handyman} will fix this issue {issue.visit}.</p>
                  <textarea className="notes" name="message" rows="10" cols="30" defaultValue={issue.description}></textarea>
                  <img src={issue.image}></img>
                  <button className="notes" onClick={this.addNotes}>Add note</button>
                  <button className="supply" onClick={this.showCatalogue}>Get supplies</button>
                </div>
              </div>)}
          </ul>
        <h3 className="ip">In Progress</h3>
          <ul className="ip-list">
             {this.state.ip.map(issue =>
                <div key={issue.id} className="ip-title">
                  <h5>{issue.title}</h5>
                <div>
                  <p>{issue.handyman} is waiting on {issue.holdup}.</p>
                  <textarea className="notes" name="message" rows="10" cols="30" defaultValue={issue.description}></textarea>
                  <img src={issue.image}></img>
                  <button className="notes" onClick={this.addNotes}>Add note</button>
                  <button className="supply" onClick={this.showCatalogue}>Get supplies</button>
                </div>
              </div>)}
          </ul>
        <h3 className="fixed">Fixed</h3>
          <ul className="fixed-list">
            {this.state.fixed.map(issue =>
              <div key={issue.id} className="fixed-title">
                <h5>{issue.title}</h5>
              <div>
                <p>{issue.description}</p>
                <img src={issue.image}></img>
              </div>
            </div>)}
          </ul>
      </div>}
      </div>
    )
  }
}

export default Issues;



//when issue gets fixed, add to description automatically who and when.