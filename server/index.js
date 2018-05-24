var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var busboy = require('connect-busboy');

var bcrypt = require('bcrypt');
var db = require('../database/helpers.js');

const saltRounds = 10;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());

var port = 3000;

app.post('/signup', function(req, res) {
  // TODO - data validation using express-validator
  console.log(req.body)
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  // hash the password by auto-gen a salt and hash
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // store hash in database
    if (hash) {
      db.createUser(username, email, hash, function(userCreated) {
        if (userCreated) {
          res.send('user created');
        } else {
          res.send('user already exists');
        }
      });
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
    file.on('data', function(data) {
      db.reportIssue(req.body.title, req.body.description, data)
      console.log('data:', data)
      file.on('end', function() {
        res.status(201).send(`File ${filename} finished`);
      });
    });
  });
  req.pipe(req.busboy);
})

app.get('/check', function(req, res) {
  db.selectIssues(res.status(200).json(results))
})




app.listen(port, function(){console.log(`server is listening on ${port} . . .`)});