import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
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
      image: false,
      selectedFile: null,
      file: null,
      imagePreviewUrl: null
    }
    this.reportIssue = this.reportIssue.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.checkImage = this.checkImage.bind(this);
    // this.uploadHandler = this.uploadHandler.bind(this);
  }

  componentDidMount() {
    $('.upload').upload({
      action: '/issues'
    });
    $('.upload').on('complete', this.previewFile)
    // $('.upload').on('complete', () => this.setState({image: true}))
    this.checkImage()
  }

  checkImage() {
    fetch('/check')
    .then(res => res.blob())
    .then(blob => {
      var objectURL = URL.createObjectURL(blob);
      var url = objectURL.slice(5)
      console.log(url)
      this.setState({imagePreviewUrl: url});
    })
  }



  reportIssue() {
    console.log('this.state.file: ', this.state.file)
    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name)

    axios.post('/issues', fd)
    .then(res => console.log(res))


    // {
    //   title: this.titleInput.value,
    //   description: this.descriptInput.value,
    //   image: this.state.file
    // })
    // .then(res => console.log(res))
        // console.log(this.titleInput.value)
        // console.log(this.descriptInput.value)
        // console.log(this.state.imagePreviewUrl)
    // console.log(event.target.files[0])
    // let title = $('#title').txt()
    // let description = $('#description').txt()
    // let image = this.state.imagePreviewUrl;
    //  console.log('title: ', title)
    //  console.log('description: ', description)
    //  console.log('image: ', image)

  }

  previewFile(e) {
  let preview = $('img');
  let file = e.target.files[0];
  let reader  = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }, () => console.log(this.state.imagePreviewUrl));
    }
    reader.readAsDataURL(file)
  }

  render() {
    return(
      <div>
      <button onClick={this.reportIssue}>Report Issue</button>
      <input id="title" className="input" ref={el => this.titleInput = el} placeholder="Title . . ."></input>
      <input id="description" className="input" ref={el => this.descriptInput = el} placeholder="Description"></input>
      <input id="image" className="input" type="file"  ref={el => this.imageInput = el} onChange={this.previewFile}></input>
      {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl} height="200" alt="Image preview..."></img>}
      </div>
    )
  }
}

export default Issnew;

