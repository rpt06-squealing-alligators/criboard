import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/index.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

  // componentDidMount() {
  //   fetch('http://api2.yp.com/listings/v1/search?searchloc=91203&term=pizza&format=json&sort=distance&radius=5&listingcount=10&key=3yp32k8718', { mode: 'no-cors' })
  //   .then(res => res.json())
  //   .then(jres => console.log(jres))
  // }

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
    console.log('this.state.searchInput: ', this.state.searchInput)
    $(".btn").click(function(){
      console.log('inside')
        $(this).button('loading').delay(1000).queue(function() {
            $(this).button('reset');
            $(this).dequeue();
        });
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      fetch(`http://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?lat=${position.coords.latitude}&lon=${position.coords.longitude}&state=tx&apikey=7968f1af4a8a442b97c820d1d905502c&format=json&notStore=true&version=4.10`)
      .then(res => res.json())
      .then(jres => jres.StreetAddresses[0].Zip)
      // .then(zip => {
      //   fetch('http://api2.yp.com/listings/v1/search?searchloc=91203&term=pizza&format=json&sort=distance&radius=5&listingcount=10&key=3yp32k8718', { mode: 'no-cors' })
      // })
      // .then(res => res.json())
      // .then(jres => console.log(jres))
    });

    // var options = {

    // }
    // 'searchloc=91203&term=pizza&format=json&sort=distance&radius=10&listingcount=10&key=3yp32k8718'

    // fetch('http://api2.yp.com/listings/v1/search', options)
    // .then(res => res.json())
    // .the(jres => console.log(jres))
    // console.log('this.state.searchInput: ', this.state.searchInput)

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