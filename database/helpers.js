var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Transaction = require('./models/transaction.js')
var Issues = require('./models/issues.js');
var Group = require('./models/group.js');
var UserGroup = require('./models/user-group.js');

var bcrypt = require('bcrypt');
var db = require('../database');

// establish relationship between users and transactions tables
// a user can have many transactions
Transaction.belongsTo(User);
User.hasMany(Transaction);

// establish relationship between groups and transactions tables
// a group can have many transactions
Transaction.belongsTo(Group);
Group.hasMany(Transaction);

// // establish many-to-many relationship between users and groups with a join table users_groups
User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through: UserGroup});

db.sync();

// save username, email and password in database
// check if username already exists in database, if not insert user info into database
var createUser = (username, email, password, callback) => {
  User.findOne({
    where: {username: username}
  })
  .then((result) => {
    if (result === null) {
      User.create({
        username: username, email: email, password: password
      })
      .then((result) => {
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
      callback(false);
    }
  })
};

var authenticateUser = (username, password, isMatch) => {
  User.findOne({
    where: {username: username}
  })
  .then((result) => {
    if (result === null) {
      isMatch(false);
    } else {
      var hash = result.dataValues.password;
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
    isMatch(false)
  })
};

var fetchUsers = (callback) => {
  User.findAll({})
  .then(result => {
    var people = result.map(person => {
      return person.dataValues.username;
    })
    callback(people);
  })
  .catch(err => {
    callback(null);
  })
};

// function to get all data from transactions table
var fetchActivity = (callback) => {
  var transactions = [];
  Transaction.findAll({})
  .then(results => {
    results.forEach(result => {
      User.findOne({
        where: {id: result.UserId}
      })
      .then(user => {
        var username = user.username;
        Group.findOne({
          where: {id: result.GroupId}
        })
        .then(group => {
          var groupname = group.groupname;
          var transaction = {
            paidBy: username,
            amount: result.amount,
            date: result.date,
            bill: result.bill,
            username: username,
            groupname: groupname
          };
          transactions.push(transaction);
          if (transactions.length === results.length) {
            callback(transactions);
          }
        })
      })
    })
  })
  .catch(err => {
    callback(null)
  });
};

var getAddress = (user, cb) => {
  User.findOne({
    where: {username: user}
  })
  .then(result => {
    var data = {
      username: result.dataValues.username,
      address: result.dataValues.address,
      latitude: result.dataValues.latitude,
      longitude: result.dataValues.longitude
    };
    cb(data);
  })
};

var reportIssue = (title, description, image) => {
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
    callback(JSON.stringify(result))
  }).bind(this);
};

var makeGroup = (data, callback) => {
  var groupname = data.groupname; // a string
  var groupmembers = data.groupmembers; // an array of all group members (all of these members exist in the users array)
  // save a new entry in groups table with groupname and groupmembers array
  var n = groupmembers.length;
  var groupTable = [];
  for (var i = 0; i < n; i++) {
    groupTable[i] = []
    for (var j = 0; j < n; j++) {
      groupTable[i][j] = 0;
    }
  }
  var matrix = JSON.stringify(groupTable);
  Group.create({
    groupname: groupname,
    matrix: matrix,
    members: JSON.stringify(groupmembers)
  })
  .then(result => {
    var groupId = result.dataValues.id;
    // find userid for each member in this group
    groupmembers.forEach((member, i)  => {
      User.findOne({
        where: {username: member}
      })
      .then(result => {
        var userId = result.dataValues.id;
        // insert userId and groupId in users_groups table
        UserGroup.create({
          UserId: userId,
          GroupId: groupId
        })
        .then(result => {
          if (i === groupmembers.length) {
            callback(true);
          }
        })
      })
    })
  });
};

var insertTransaction = (groupname, bill, amount, date, paidby, cb) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var members = JSON.parse(result.dataValues.members);
    var groupId = result.dataValues.id;
    var groupMatrix = result.dataValues.matrix;
    User.findOne({where: {username: paidby}})
      .then((result) => {
        var userId = result.dataValues.id;
        Transaction.create({
          bill: bill,
          amount: amount,
          date: date,
          UserId: userId,
          GroupId: groupId
        })
        .then(result => {
          // insert transaction in groups table matrix
          var groupTable = JSON.parse(groupMatrix);
          var n = groupTable.length;
          // find userIndex in groupmembers array and adjust matrix values when transaction is added
          var userIndex = members.indexOf(paidby);
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
              groupname: groupname
            }
          })
          .then(result => {
            cb(result)
          })
        })

      })
  })
  .catch(err => console.log(err))
};

// find groups for given user
var findGroups = (username, callback) => {
  // find userid for given user
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userid = result.dataValues.id;
    // find group ids for this user
    UserGroup.findAll({
      where: {UserId: userid}
    })
    .then(results => {
      var groups = [];
      results.forEach((result, i) => {
        // for each group, find groupname from groups table
        var groupId = result.dataValues.GroupId;
        Group.findOne({
          where: {id: groupId}
        })
        .then(result => {
          groups.push(result.dataValues.groupname)
          if (groups.length === results.length) {
            callback(null, groups)
          }
        })
      })
    })
  })
};

// find user info for a particular user
var findUserInfo = (username, callback) => {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userid = result.dataValues.id;
    // find group ids for this user
    UserGroup.findAll({
      where: {UserId: userid}
    })
    .then(results => {
      var groups = [];
      results.forEach((result, i) => {
        // for each group, find groupname from groups table
        groups[i] = {};
        var groupId = result.dataValues.GroupId;
        Group.findOne({
          where: {id: groupId}
        })
        .then(result => {
          var groupmembers = JSON.parse(result.dataValues.members);
          var groupMatrix = JSON.parse(result.dataValues.matrix);
          var userIndex = groupmembers.indexOf(username);
          groups[i].groupname = result.dataValues.groupname;
          groups[i].groupmembers = groupmembers;
          groups[i].row = groupMatrix[userIndex];
          var check = groups.reduce((acc,item) => {
            return acc && (Object.keys(item).length === 3);
          }, true)
          if (check) {
            callback(groups);
          }
        })
      })
    })
  })
};

// given a username, find user id in table
var findUserId = function(username, callback) {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userId = result.dataValues.id
    callback(userId)
  })
}

var settleUsers = (groupname, id1, id2, callback) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var groupMatrix = result.dataValues.matrix;
    var groupTable = JSON.parse(groupMatrix);
    groupTable[id1][id2] = 0;
    groupTable[id2][id1] = 0;
    groupMatrix = JSON.stringify(groupTable);
    Group.update({
      matrix: groupMatrix
    }, {
      where: {
        groupname: groupname
      }
    })
    .then(result => {
      callback(true);
    })
  })
};

var fetchUsersByGroup = (groupname, callback) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var members = result.dataValues.members;
    callback(members);
  })
};

// save address to database
var postAddress = (data, callback) => {
  var latitude = data.latitude;
  var longitude = data.longitude;
  var address = data.address;
  var username = data.username;
  User.update({
    latitude: latitude,
    longitude: longitude,
    address: address
  }, {
    where: {username: username}
  })
  .then(result => {
    callback(true)
  })
}

// delete a group
var delGroup = (groupname, callback) => {
  Group.destroy({
    where: {groupname: groupname}
  })
  .then(result => {
    callback(true);
  })
};

module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues,
  authenticateUser: authenticateUser,
  insertTransaction: insertTransaction,
  fetchActivity: fetchActivity,
  fetchUsers: fetchUsers,
  fetchActivity: fetchActivity,
  findUserInfo: findUserInfo,
  findUserId: findUserId,
  settleUsers: settleUsers,
  makeGroup: makeGroup,
  findGroups: findGroups,
  fetchUsersByGroup: fetchUsersByGroup,
  postAddress: postAddress,
  delGroup: delGroup,
  getAddress: getAddress
};