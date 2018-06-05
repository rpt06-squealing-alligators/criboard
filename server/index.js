var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var fs = require('fs');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var busboy = require('connect-busboy');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../client/src/assets/downloads/'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage }).single('image')


var busboy = require('connect-busboy');

var bcrypt = require('bcrypt');
var db = require('../database/helpers.js');
var connection = require('../database');
var sessionStore = require('./../database/models/session.js');

const saltRounds = 10;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares

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
      if (matched) {
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
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.post('/signupuser', function(req, res) {
  // data validation using express-validator
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid. Please try again.').isEmail();
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
  } else {
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
                res.send('user created');
              }
            });
          } else {
            res.send('user already exists');
          }
        });
      }
    });
  }
});

app.post('/loginuser', passport.authenticate('local'), (req, res) => {
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

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if(err) {
      console.log(err);
    }
    db.reportIssue(req.body.title, req.body.description, './' + req.file.filename, () => {
      console.log('results: ', results)
    })
  })
  res.status(201).redirect('/issues');
});

app.post('/group', function(req, res) {
  var data = {
    groupname: req.body.groupname,
    groupmembers: req.body.user
  };
  db.makeGroup(data, function(done) {
    res.send("group created");
  })
});

app.get('/data', authMiddleware(), function(req, res) {
  db.selectIssues(data => {
    res.status(200).json(data)
  })
})

app.get('/check', authMiddleware(),function(req, res) {
  db.selectIssues
  .then(data => res.send(data))
})

app.post('/postaddress', authMiddleware(), function(req, res) {
  var data = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    username: req.user,
    address: req.body.address
  };
  db.postAddress(data, function() {
    res.status(201).send('success');
  });

})

app.post('/addtransaction', authMiddleware(), function(req, res) {
  db.insertTransaction(req.body.groupname, req.body.bill, req.body.amount, req.body.date, req.body.user, function(result) {
    res.send(result);
  })
});

app.get('/fetchusers/:group', authMiddleware(), function(req, res) {
  var group = req.params.group;
  db.fetchUsersByGroup(group, function(people) {
    res.send(people);
  })
});

app.get('/fetchusers', authMiddleware(), function(req, res) {
  db.fetchUsers(function(people) {
    res.send(people);
  })
});

app.get('/allactivity', authMiddleware(), function(req, res) {
  var username = req.user;
  db.fetchActivity(function(results) {
    res.send(results);
  });
});

// route to get username of the currently logged in user
app.get('/getuser', function(req, res) {
  res.send(req.user);
});

app.get('/getaddress', function(req, res) {
  var username = req.user;
  db.getAddress(username, function(results) {
    res.status(200).send(results);
  })
});

// find all groups for logged in user
app.get('/groups', authMiddleware(), function(req, res) {
  var username = req.user;
  db.findGroups(username, (err, groups) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(groups);
    }
  })
});

// route to get info about the user that's logged in (including amounts owed to/owed by user in all groups of which user is a part of
app.get('/getuserinfo', authMiddleware(), function(req, res) {
  var username = req.user;
  // find groups that user belongs to - groupname and groupmembers array
  // for each group, find row of user
  // send this info back to client
  db.findUserInfo(username, function(results) {
    var data = {
      username: username,
      groupInfo: results
    }
    res.json(data);
  })
})

// to settle up the given 2 users
app.post('/settleup', authMiddleware(), function(req, res) {
  db.settleUsers(req.body.groupname, req.body.user1, req.body.user2, function(done) {
    if (done) {
      res.send('users settled');
    }
  })
})

app.post('/postaddress', function(req, res) {
  var data = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address,
    username: req.user
  };
  db.postAddress(data, function(done) {
    if(done) {
      res.send('address saved');
    }
  })
});

app.post('/deletegroup', function(req, res) {
  var group = req.body.group;
  db.delGroup(group, function(done) {
    if (done) {
      res.send('group deleted');
    }
  });
});

// protect all routes other than landing, login, and signup pages
app.get('*', authMiddleware(), function(req, res) {
  // console.log('req.user', req.user)
  // console.log('isauthenticated', req.isAuthenticated())
  // console.log('serving authenticated route')
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

var port = process.env.PORT || 3000

app.listen(port, function() {
  console.log(`server is listening on ${port} . . .`)
});