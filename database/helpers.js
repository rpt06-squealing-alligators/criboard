var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Transaction = require('./models/transaction.js')
var Issues = require('./models/issues.js');
var bcrypt = require('bcrypt');
var db = require('../database');

// establish relationship between users and transactions tables
// a user can have many transactions
Transaction.belongsTo(User);
User.hasMany(Transaction);

db.sync();

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
                //login comes from passport and creates a session and a cookie for the user
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
        // console.log('user does not exist');
        isMatch(false);
      } else {
        var hash = result.dataValues.password;
        // console.log('hash for user', hash);
        var userId = result.dataValues.id;
        bcrypt.compare(password, hash, function(err, response) {
          if (response === true) {
            isMatch(true, userId);
          } else {
            isMatch(false);
          }
        });
      }
    })
    .catch(err => {
      // console.log('error reading from database');
      isMatch(false)
    })
};

var fetchPeople = function(callback) {
  User.findAll({})
    .then(result => {
      var people = result.map(person => {
        return person.dataValues.username;
      })
      // console.log(people)
      callback(people);
    })
    .catch(err => {
      // console.log('error fetching from database');
      callback(null);
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
  Issues.findOne({attributes: ['title']})
  .then(result => cb(result))
}

var insertTransaction = (bill, amount, paidby, cb) => {
  User.findOne({where: {username: paidby}})
  .then((result) => {
    console.log('')
    var userId = result.dataValues.id;
    console.log('userId', userId)
    Transaction.create({
      bill: bill,
      amount: amount,
      UserId: userId
    })
    .then(result => {
      // console.log(result)
      cb(result)
    })
  })
  .catch(err => console.log(err))
};

module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues,
  authenticateUser: authenticateUser,
  insertTransaction: insertTransaction,
  fetchPeople: fetchPeople
};