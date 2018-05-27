var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var Sequelize = require('sequelize')
var cookieParser = require('cookie-parser')

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var busboy = require('connect-busboy');

var bcrypt = require('bcrypt');
var db = require('../database/helpers.js');
var connection = require('../database');
var sessionStore = require('./../database/models/session.js');

const saltRounds = 10;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(session({
  secret: 'lalala',
  cookieName: 'criboard',
  store: sessionStore,
  resave: false,
  saveUninitialized: false // only save sessions for users that are logged in
  // ,cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// authenticate user with a username and password stored in the database (using Passport local strategy)
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.authenticateUser(username, password, function(matched, user_id) {
      // console.log('user matched or not', matched)
      if (matched) {
        // console.log('username for matched user', username)
        return done(null, username)
      } else {
        return done(null, false)
      }
    })
  }
));

// Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

// middleware to check if user is logged in
var authMiddleware = function () {
  return (req, res, next) => {
    // console.log(`req.session.passport.user: ${req.session.passport}`);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}

app.get('/signup', function(req, res) {
  // console.log('req.user', req.user)
  // console.log('isauthenticated', req.isAuthenticated())
  // console.log('serving signup route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/login', function(req, res) {
  // console.log('req.user', req.user)
  // console.log('isauthenticated', req.isAuthenticated())
  // console.log('serving login route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.post('/signupuser', function(req, res) {
  // TODO - data validation using express-validator
  console.log(req.body)
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  // hash the password by auto-gen a salt and hash
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // store hash in database
    if (hash) {
      db.createUser(username, email, hash, function(userCreated, user_id) {
        if (userCreated) {
          //login comes from passport and creates a session and a cookie for the user
          req.login(username, function(err) {
            if (err) {
              console.log(err)
            } else {
              // console.log('req.user', req.user)
              // console.log('isauthenticated', req.isAuthenticated())
              res.send('user created');
            }
          });
        } else {
          res.send('user already exists');
        }
      });
    }
  });
});

app.post('/loginuser', passport.authenticate('local'), (req, res) => {
  console.log('req.user in loginuser', req.user)
  res.send(req.user);
})


app.get('/logoutuser', function(req, res) {
  // req.logout is a function available from passport
  req.logout();
  // destroy session for the user that has been logged out
  req.session.destroy();
  // logout user
  res.send('logged out')
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

app.get('/data', authMiddleware(), function(req, res) {
  // console.log('issues is getting')
  res.send('test')
  // db.selectIssues(res.status(200).json('test'))
})

app.get('/check', authMiddleware(), function(req, res) {
  // res.json('test')
  db.selectIssues((results) => res.json(results))
})


app.post('/addtransaction', authMiddleware(), function(req, res) {
  // console.log('req.body: ', req.body)
  db.insertTransaction(req.body.bill, req.body.amount, req.body.user, function(result) {
    res.status(201).send(result);
  })
})

app.get('/fetchusers', authMiddleware(), function(req, res) {
  db.fetchPeople(function(people) {
    res.send(people);
  })
});

// protect all routes other than landing, login, and signup pages
app.get('*', authMiddleware(), function(req, res) {
  // console.log('req.user', req.user)
  // console.log('isauthenticated', req.isAuthenticated())
  // console.log('serving authenticated route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

var port = 3000;

app.listen(port, function() {
  console.log(`server is listening on ${port} . . .`)
});