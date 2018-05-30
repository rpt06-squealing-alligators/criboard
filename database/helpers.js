var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Transaction = require('./models/transaction.js')
var Issues = require('./models/issues.js');
var Ledgers = require('./models/ledger.js');
var Group = require('./models/group.js');

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

var fetchUsers = function(callback) {
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

// function to get all data from transactions table
var fetchActivity = function(callback) {
  var transactions = [];
  Transaction.findAll({})
  .then(results => {
    results.forEach(result => {
      User.findOne({
        where: {id: result.UserId}
      })
      .then(user => {
        username = user.dataValues.username;
        var transaction = {
          paidBy: username,
          amount: result.amount,
          bill: result.bill
        };
        transactions.push(transaction);
        if (transactions.length === results.length) {
          // console.log(transactions)
          callback(transactions);
        }
      })
    })
  })
  .catch(err => {
    // console.log(err);
    callback(null)
  });
};

var reportIssue = (title, description, image) => {
  // console.log('title: ', title)
  // console.log('title: ', description)
  // console.log('title: ', image)
  Issues.create({
    status: 'reported',
    title: title,
    description: description,
    image: image
  });
}

var selectIssues = (callback) => {
  Issues.findAll()
  .then((result) => {
    console.log(callback)
    callback(JSON.stringify(result))
  }).bind(this);
};

// function to initialize the groups table with an NxN matrix of all zeros
var initGroup = () => {
  fetchUsers(users => {
    var n = users.length;
    var groupTable = [];
    for (var i = 0; i < n; i++) {
      groupTable[i] = []
      for (var j = 0; j < n; j++) {
        groupTable[i][j] = 0;
      }
    }
    var matrix = JSON.stringify(groupTable);
    Group.create({
      groupname: 'Super Mario World',
      matrix: matrix
    })
    .then(result => {
      // console.log('result of initializing group', result)
      console.log('group initialized');
    })
  })
};

var insertTransaction = (bill, amount, paidby, cb) => {
  // if this is the first transaction, initialize the groups table to save an NxN matrix of all zeros
  Transaction.findAll({})
  .then(result => {
    if (result.length === 0) {
      initGroup();
    }
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
          // insert transaction in groups table matrix
          Group.findOne({
            where: {groupname: 'Super Mario World'}
          })
          .then(result => {
            console.log('groupfound')
            var groupMatrix = result.dataValues.matrix;
            var groupTable = JSON.parse(groupMatrix);
            var n = groupTable.length;
            // console.log('group table', groupTable)
            var userIndex = userId - 1;
            var temp = amount/n;
            for (var i = 0; i < n; i++) {
              if (i != userIndex) {
                groupTable[userIndex][i] -= temp;
                groupTable[i][userIndex] += temp;
              }
            }
            groupMatrix = JSON.stringify(groupTable);
            Group.update({
              matrix: groupMatrix
            }, {
              where: {
                groupname: 'Super Mario World'
              }
            })
          })
        })
      })
  })
  .catch(err => console.log(err))
};

var createLedger = (userArr) => {
  var arr = ['a', 'b', 'c'];
  var toCreate = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      var obj = {matrixRow: '',
                matrixColumn: '',
                value: 0
                }
      obj.matrixRow = arr[i];
      obj.matrixColumn = arr[j];
      toCreate.push(obj);
    }
  }
  Ledgers.bulkCreate(toCreate)
  // .then(() => {
  //   return Ledgers.findAll();
  // }).then((users) => console.log(users))
}

var updateLedger = (grantor, amount) => {
  Ledgers.find({where: {matrixRow: !grantor} })
  .on('success', function (record) {
    // Check if record exists in db
    if (record) {
      record.updateAttributes({
        value: -amount
      })
      .success(function (results) {console.log(results)})
    }
  })
}

var findUserInfo = function(username, callback) {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userId = result.dataValues.id;
    Group.findOne({
      where: {groupname: 'Super Mario World'}
    })
    .then(result => {
      var groupTable = JSON.parse(result.dataValues.matrix);
      var index = userId - 1;
      // console.log(groupTable[index]);
      callback(groupTable[index])
    })
  })
};

// given a username, find user id in table
var findUserId = function(username, callback) {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    // console.log(result.dataValues.id)
    var userId = result.dataValues.id
    callback(userId)
  })
}

// make values of 2 matrix elements 0 - these elements are determined from the given user ids
var settleUsers = function(id1, id2, callback) {
  Group.findOne({
    where: {groupname: 'Super Mario World'}
  })
  .then(result => {
    var groupMatrix = result.dataValues.matrix;
    var groupTable = JSON.parse(groupMatrix);
    // console.log('USERS IN DATABASE', id1, id2)
    groupTable[id1][id2] = 0;
    groupTable[id2][id1] = 0;
    groupMatrix = JSON.stringify(groupTable);
    Group.update({
      matrix: groupMatrix
    }, {
      where: {
        groupname: 'Super Mario World'
      }
    })
    .then(result => {
      callback(true);
    })
  })
};


module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues,
  authenticateUser: authenticateUser,
  insertTransaction: insertTransaction,
  fetchActivity: fetchActivity,
  createLedger: createLedger,
  updateLedger: updateLedger,
  fetchUsers: fetchUsers,
  fetchActivity: fetchActivity,
  findUserInfo: findUserInfo,
  findUserId: findUserId,
  settleUsers: settleUsers
};