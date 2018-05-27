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
import 'formstone/dist/js/core.js';
import b64toBlob from 'b64-to-blob';

class Issnew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: false,
      selectedFile: null,
      file: null,
      imagePreviewUrl: null,
      blob: null
    }
    this.reportIssue = this.reportIssue.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.checkImage = this.checkImage.bind(this);
    this.blobToBase64 = this.blobToBase64.bind(this);
    // this.resizeBase64Img = this.resizeBase64Img.bind(this);
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
    let reader  = new FileReader();
    fetch('/check')
    .then(res => res.json())
    .then((jres) => {
      console.log('jres: ', jres)
      var blob = new Blob([new Uint8Array(jres.image.data)], {type: 'img/jpg'});
      console.log('blob: ', blob)

    reader.onloadend = () => {
      console.log('reader.result (supposed to be dataUrl): ', reader.result)
      this.setState({imagePreviewUrl: reader.result})

    }

      var objectURL = URL.createObjectURL(blob)
      console.log('objectURL: ', objectURL)
      // var blobUrl = URL.createObjectURL(blob);
      // console.log('blobUrl (made within .then): ', blobUrl)
      reader.readAsDataURL(blob)
    })


      // var objectURL = URL.createObjectURL(blob);
      // this.setState({imagePreviewUrl: objectURL});

    reader.onloadend = () => {
      console.log('reader.result (supposed to be dataUrl): ', reader.result)
      // var partial = reader.result.split(',')
      // console.log('partial: ', partial)
      // var fixed = 'data:image/jpg;base64, ' + partial[1]
      // console.log('fixed: ', fixed)
      // this.setState({
      //   imagePreviewUrl: fixed
      // }, () => console.log(this.state.imagePreviewUrl));
    }

  }



  reportIssue() {
    console.log('this.state.imagePreviewUrl: ', this.state.imagePreviewUrl)
    var b64Data = this.state.imagePreviewUrl.split(',')[1];
    console.log('b64Data: ', b64Data)
    var blob = b64toBlob(b64Data, this.state.file.type);
    console.log('blob: ', blob)

    var body =
    {
      title: this.titleInput.value,
      description: this.descriptInput.value,
      image: blob
    }
    // this.blobToBase64(this.state.file, function(base64) {
    //   body.image = base64;
      axios.post('/issues', body)
      .then(res => console.log(res))
    // })
  }

  blobToBase64(blob, cb) {
    let reader  = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(this.state.file);
  }




    // console.log('Object.keys(this.state.file): ', Object.keys(this.state.file))
    // console.log('this.state.file: ', this.state.file)
    // const fd = new FormData();
    // // console.log('this.state.file: ', this.state.file)
    // reader.onloadend = () => {
    //   let data = "data:" + this.state.file.type + ";base64," + reader.result.toString('base64');
    //   var dataURI = reader.result;
    //   var byteString = atob(dataURI.split(',')[1]);
    //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    //   var ab = new ArrayBuffer(byteString.length);
    //   var ia = new Uint8Array(ab);
    //   for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   var blob = new Blob([ab], {type: mimeString});
    //   console.log('blob: ', blob)
    //   console.log('this.state.file.name: ', this.state.file.name)
    //   fd.append('image', data, this.state.file.name)

    // }


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

  // }

  // resizeBase64Img(base64, width, height) {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = width;
  //   canvas.height = height;
  //   var context = canvas.getContext("2d");
  //   var deferred = $.Deferred();
  //   $("<img/>").attr("src", "data:image/gif;base64," + base64).on('load', function() {
  //       context.scale(width/this.width,  height/this.height);
  //       context.drawImage(this, 0, 0);
  //       deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));
  //   });
  //   return deferred.promise();
  // }

  previewFile(e) {
  // let preview = $('img');
  let file = e.target.files[0];
  console.log('file: ', file)
  let reader  = new FileReader();
    reader.onloadend = () => {
      var dataUrl = reader.result;


    // this.resizeBase64Img(base64, 80, 80).then(function(newImg) {
    //   $("body").append(newImg);
    // });


      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }, () => console.log(btoa(this.state.imagePreviewUrl)));
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

