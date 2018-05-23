var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var busboy = require('connect-busboy');

var db = require('../database/helpers.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());

var port = 3000;

app.post('/signup', function(req, res) {
  console.log(req.body)
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  db.createUser(username, email, password, function(userCreated) {
    if (userCreated) {
      res.send('user created');
    } else {
      res.send('user already exists');
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', function(req, res) {
  // console.log('serving default route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});


app.post('/issues', function (req, res, next) {
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    fs.writeFile('test.jpg', file, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
  });
  req.pipe(req.busboy);
  res.status(201).send('Post to issues went through')

//see this for storing in database:
//https://stackoverflow.com/questions/14704559/how-to-insert-image-in-mysql-databasetable

})


app.listen(port, function(){console.log(`server is listening on ${port} . . .`)});