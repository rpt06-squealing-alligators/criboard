var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var session = require('express-session');
var passport = require('passport');

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

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(session({
  secret: 'criboard',
  resave: false,
  saveUninitialized: false, // only save sessions for users that are logged in
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.post('/issues', function (req, res, next) {
  console.log('posting')

let body = [];
req.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  console.log('body: ', body)
  // at this point, `body` has the entire request body stored in it as a string
});

  // console.log('req.body.image: ', req.body.image)


  // var buffer = require('fs').createWriteStream('output.txt');
  // var enc = require('base64-stream').encode();
  // savePixels(pixels, 'png').on('end', function() {
  //   //Writes a DataURL to  output.txt
  //   buffer.write("data:image/png;base64,"+enc.read().toString());
  // }).pipe(enc);
  // // var buf = new Buffer(req.body.image, 'base64');
  // // console.log('+++++++++POST TO ISSUES +++++++')
  // db.reportIssue(req.body.title, req.body.description, req.body.image)

  // // var file = fs.createWriteStream(path.resolve(__dirname, '../client/src/assets/') + 'test');
  // // buff.pipe(file)



  // req.on('data ', function(data){
  //   console.log('readable')
  //   console.log(req.read());
  // });
  // console.log('req.body: ', req.body)
  // db.reportIssue(req.body.title, req.body.description, req.body.image)
  // req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  //   console.log('file: ', file)
  //   file.on('data', function(data) {
  //     db.reportIssue(req.body.title, req.body.description, data)
  //     console.log('data:', data)
  //     file.on('end', function() {
  //       res.send(`File ${filename} finished`);
  //     });
  //   });
  // });
  // req.pipe(req.busboy);
})

app.get('/data', function(req, res) {
  // console.log('issues is getting')
  res.send('test')
  // db.selectIssues(res.status(200).json('test'))
})

app.get('/check', function(req, res) {
  // res.json('test')
  db.selectIssues((results) => res.json(results))
})

app.get('*', function(req, res) {
  // console.log('serving default route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});


app.listen(port, function(){console.log(`server is listening on ${port} . . .`)});