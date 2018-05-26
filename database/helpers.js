var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Issues = require('./models/issues.js');
var bcrypt = require('bcrypt');

// save username, email and password in database
// check if username already exists in database, if not insert user info into database
var createUser = (username, email, password, callback) => {
  User.findOne({
    where: {username: username}
  })
    .then((result) => {
      // console.log(result)
      // if user doesn't exist
      if (result === null) {
        User.create({
          username: username, email: email, password: password
        })
          .then((result) => {
            // console.log('new user created', result)
            // grab the last inserted id in database
            User.findOne({
              where: {username: username}
            })
              .then((result) => {
                // console.log(result.dataValues)
                var user_id = result.dataValues.id;
                callback(true, user_id);
              })
          })
      } else {
        // username already exists in database
        // console.log('username already exists');
        callback(false);
      }
    })
};

var authenticateUser = function(username, password, isMatch) {
  User.findOne({
    where: {username: username}
  })
    .then((result) => {
      if (result === null) {
        console.log('user does not exist');
        isMatch(false);
      } else {
        var hash = result.dataValues.password;
        console.log('hash for user', hash);
        bcrypt.compare(password, hash, function(err, response) {
          if (response === true) {
            isMatch(true)
          }
        });
      }
    })
    .catch(err => {
      console.log('error reading from database');
    })
};

var reportIssue = (title, description, image) => {
  // console.log('title: ', title)
  // console.log('title: ', description)
  // console.log('title: ', image)
  Issues.create({
    title: title,
    description: description,
    image: image
  });
}

var selectIssues = (cb) => {
  console.log('selectIssues is being called')
  Issues.findAll()
  .then(result => cb(result))
}

// createUser('tester2', 'test', 'test')

module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues,
  authenticateUser: authenticateUser
};