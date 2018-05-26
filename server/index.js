var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var Sequelize = require('sequelize')
var cookieParser = require('cookie-parser')

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var busboy = require('connect-busboy');

var bcrypt = require('bcrypt');
var db = require('../database/helpers.js');
var connection = require('../database');

const saltRounds = 10;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());

app.use(express.static(path.resolve(__dirname, '../client/dist')));

var sessionStore = new SequelizeStore({
  db: connection,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
})

sessionStore.sync();

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

// authenticate user with a username and password stored in the database
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('in local strategy function', username, password);
    db.authenticateUser(username, password, function(matched) {
      console.log('password matched', matched)
      if (matched) {
        console.log('username for matched user', username)
        return done(null, username)
      } else {
        return done(null, false)
      }
    })
  }
));

var authMiddleware = function () {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${req.session.passport}`);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}

var port = 3000;

<<<<<<< HEAD
=======

>>>>>>> da93a1dfcca0f333def6aecd36d02e4f46e1b3e7
app.get('/signup', function(req, res) {
  console.log('req.user', req.user)
  console.log('isauthenticated', req.isAuthenticated())
  console.log('serving signup route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/login', function(req, res) {
  console.log('req.user', req.user)
  console.log('isauthenticated', req.isAuthenticated())
  console.log('serving login route')
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
          //login comes from passport and creates a session and a cookie for the user

          req.login(user_id, function(err) {
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


// Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
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

// protect all routes other than landing, login and signup pages
app.get('*', authMiddleware(), function(req, res) {
  console.log('req.user', req.user)
  console.log('isauthenticated', req.isAuthenticated())
  console.log('serving authenticated route')
  // if (req.isAuthenticated()) {
    // console.log('serving default route')
});

app.get('*', function(req, res) {
  console.log('req.user', req.user)
  console.log('isauthenticated', req.isAuthenticated())
  // console.log('serving default route')

  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

// app.get('*', function(req, res) {
//   console.log('req.user', req.user)
//   console.log('isauthenticated', req.isAuthenticated())
//   // if (req.isAuthenticated()) {
//     console.log('serving default route')
//     res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
//   // }
// });


app.listen(port, function(){console.log(`server is listening on ${port} . . .`)});