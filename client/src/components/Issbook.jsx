import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/index.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import $ from 'jquery';
axios.defaults.headers.Authorization = 'Bearer JFzd1IrkYY5-v3PKIg4GOzHobFHP09vsV9D1i6RVUGtsb0ZzhNmoMsj2EZsDMIdAQt2hvubokTRUV9rqE3gs5Ec83n0pYiYZNbIDpozs11ASzS1yPCaLWIo78DMPW3Yx'

class Issbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      date: moment()
    }
    this.handleChange = this.handleChange.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(date) {
    console.log('date: ', date)
    this.setState({
      date: date
    });
  }

  setQuery(e) {
    console.log('e: ', e.target.value)
    this.setState({searchInput: e.target.value})
  }

  search(e) {

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.yelp.com/v3/businesses/search?term=plumber&latitude=43.8957864&longitude=%0A-91.2367975",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer JFzd1IrkYY5-v3PKIg4GOzHobFHP09vsV9D1i6RVUGtsb0ZzhNmoMsj2EZsDMIdAQt2hvubokTRUV9rqE3gs5Ec83n0pYiYZNbIDpozs11ASzS1yPCaLWIo78DMPW3Yx",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    // "Postman-Token": "3a14a2a0-ba92-47c4-a814-30468eab9f70"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});



//     var searchTerm = this.state.searchInput
//     console.log('this.state.searchInput: ', this.state.searchInput)

// navigator.geolocation.getCurrentPosition(function(position) {
//   console.log('position: ', position)
//   // var options = (
//   //   method: 'GET',
//   //   headers: new Headers({
//   //       'Access-Control-Allow-Origin': '*',
//   //       'Authorization': '[my token]'
//   //       'Content-Type': 'application/json'
//   //   })


// const config = {
//   headers: {
//       // 'Accept': 'application/json',
//   // 'Content-Type': 'application/x-www-form-urlencoded',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
//     'Authorization': 'Bearer JFzd1IrkYY5-v3PKIg4GOzHobFHP09vsV9D1i6RVUGtsb0ZzhNmoMsj2EZsDMIdAQt2hvubokTRUV9rqE3gs5Ec83n0pYiYZNbIDpozs11ASzS1yPCaLWIo78DMPW3Yx'},
//   params: {
//     term: 'tacos',
//     latitude: 43.8957864,
//     longitude: -91.2367975
//   }
// };

// // const config = {


// //   headers: {
// //     'Access-Control-Allow-Origin': '*',
// //     'Authorization': 'Bearer JFzd1IrkYY5-v3PKIg4GOzHobFHP09vsV9D1i6RVUGtsb0ZzhNmoMsj2EZsDMIdAQt2hvubokTRUV9rqE3gs5Ec83n0pYiYZNbIDpozs11ASzS1yPCaLWIo78DMPW3Yx'},
// //   params: {
// //     term: searchTerm,
// //     latitude: position.coords.latitude,
// //     longitude: position.coords.longitude
// //   }
// // };
// console.log('config: ', config)

//   axios.get('https://api.yelp.com/v3/businesses/search', config)
//   .then(response => console.log(response));


//   // fetch(`https://api.yelp.com/v3/businesses/search?term=${searchTerm}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
//   //   {
//   //     mode: 'no-cors',
//   //     headers:
//   //     new Headers({ Authorization: 'Bearer JFzd1IrkYY5-v3PKIg4GOzHobFHP09vsV9D1i6RVUGtsb0ZzhNmoMsj2EZsDMIdAQt2hvubokTRUV9rqE3gs5Ec83n0pYiYZNbIDpozs11ASzS1yPCaLWIo78DMPW3Yx' })

//   // })
//   // .then(res => console.log('res.data:', res.data))

//  });

//     // console.log('this.state.searchInput: ', this.state.searchInput)
//     // $(".btn").click(function(){
//     //   console.log('inside')
//     //     $(this).button('loading').delay(1000).queue(function() {
//     //         $(this).button('reset');
//     //         $(this).dequeue();
//     //     });
//     // });

//     // navigator.geolocation.getCurrentPosition(function(position) {
//     //   fetch(`http://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?lat=${position.coords.latitude}&lon=${position.coords.longitude}&state=tx&apikey=7968f1af4a8a442b97c820d1d905502c&format=json&notStore=true&version=4.10`)
//     //   .then(res => res.json())
//     //   .then(jres => jres.StreetAddresses[0].Zip)
//     //   // .then(zip => {
//     //   //   fetch('http://api2.yp.com/listings/v1/search?searchloc=91203&term=pizza&format=json&sort=distance&radius=5&listingcount=10&key=3yp32k8718', { mode: 'no-cors' })
//     //   // })
//     //   // .then(res => res.json())
//     //   // .then(jres => console.log(jres))
//     // });

//     // var options = {

//     // }
//     // 'searchloc=91203&term=pizza&format=json&sort=distance&radius=10&listingcount=10&key=3yp32k8718'

//     // fetch('http://api2.yp.com/listings/v1/search', options)
//     // .then(res => res.json())
//     // .the(jres => console.log(jres))
//     // console.log('this.state.searchInput: ', this.state.searchInput)

  }

  render() {
    return(
      <div>
        <h3>Booking a Handyman</h3>
        <input onChange={this.setQuery} value={this.state.searchInput} placeholder="Search for repairmen"></input>
        <div className="dropdown">
          <button className="btn btn-primary" data-loading-text="<i class='fa fa-spinner fa-spin '></i>searching" type="button" onClick={this.search}>go</button>
        </div>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />
      </div>
    )
  }
}

export default Issbook;



//calendar:
//https://www.cronofy.com/developers/tutorials/getting-started/

//catalogue:
// https://www.sitepoint.com/amazon-product-api-exploration-lets-build-a-product-search/