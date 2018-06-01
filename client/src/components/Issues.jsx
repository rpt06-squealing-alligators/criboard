import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// import {Collapse} from 'react-collapse';
import $ from 'jquery';
import Issnew from './Issnew.jsx';
import Issbook from './Issbook.jsx';
import Issupplies from './Issupplies.jsx';
import data from '../assets/mockdata.json';
import '../assets/styles/index.css';
var images = require.context('../assets/downloads', false, /\.(png|jpg|gif)$/);

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      activeModal: null,
      report: false,
      showReportButton: false,
      showScheduleButton: false,
      showSuppliesButton: false,
      pictures: [],
      reported: data.filter(issue => issue.status === 'reported'),
      scheduled: data.filter(issue => issue.status === 'scheduled'),
      ip: data.filter(issue => issue.status === 'ip'),
      fixed: data.filter(issue => issue.status === 'fixed')
    }
    this.showReport = this.showReport.bind(this);
    this.displayReportButton = this.displayReportButton.bind(this);
    this.showCatalogue = this.showCatalogue.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.updateData();
    // $( function() {
    //   $( "#datepicker" ).datepicker();
    // } );
    images.keys().forEach(function(key){
      console.log('key: ', key)
      console.log('images(key): ', images(key));
    });
  }

  componentWillMount() {
    this.updateData();
  }

  updateData() {
    axios.get('/data')
    .then(res => JSON.parse(res.data))
    // .then(jres => JSON.parse(jres))
    .then(data => {
      if(data) {

    //   var data = data.data
    //   console.log('data: ', typeof data)
      var pictures = data.map(instance => images(instance.image))
    // //   console.log('pictures: ', pictures)
      this.setState({
        reported: data.filter(issue => issue.status === 'reported'),
        scheduled: data.filter(issue => issue.status === 'scheduled'),
        ip: data.filter(issue => issue.status === 'ip'),
        fixed: data.filter(issue => issue.status === 'fixed'),
        pictures: pictures
      }, () => console.log('images(this.state.reported[0].image): ', images(this.state.reported[0].image) ))


      }

    })
    .catch(err => console.log(err))
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

  handleClose() {
    this.setState({
      show: false,
      activeModal: null
    });
  }

  handleShow(e, i) {
    this.setState({
      show: true,
      activeModal: i
    });
  }


  render() {
    return(
      <div>



      <Home />
      {this.state.report ? <Issnew /> :
      <div className="issues grid">
        <h3 className="reports" onMouseEnter={this.displayReportButton}>Reports</h3>
          {
            this.state.showReportButton &&
            <Button className=" btn btn-primary report-button" onClick={this.showReport}>Report Issue</Button>
          }
          <ul className="reports-list">
            {this.state.reported.map((issue, i) =>
              <div key={issue.id} className="report-title">
                <h5>{issue.title}</h5>
                  <div>
                    <p>{issue.description}</p>
                    <Button bsStyle="primary" bsSize="small" onClick={e => this.handleShow(e, i)}>Photo</Button>
                    <Button bsStyle="primary" bsSize="small" className="booking" onClick={this.bookRepair}>Book handyman</Button>
                    <Button bsStyle="primary" bsSize="small" className="supply" onClick={this.showCatalogue}>Get supplies</Button>
                    <Modal show={this.state.activeModal === i} onHide={this.handleClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <img src={this.state.pictures[i]} height="200"></img>
                      </Modal.Body>
                    </Modal>
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
//currently the setstate doesn't update when the issue is reported - must refresh page
//