var db = require('../../database');
var Sequelize = require('sequelize');

// define model for groups table to save a bills owed matrix for each group

var Group = db.define('Group', {
  groupname: {
    type: Sequelize.STRING,
    unique: true
  },
  matrix: {
    type: Sequelize.TEXT // serialize the matrix to store it
  },
  members: {
    type: Sequelize.TEXT // save the array of users in the groups table as an MVP - later use the join table to get this information
  }
});

module.exports = Group;

// // n users in the group
// // n x n matrix

// var n = 3;
// var groupTable = [];
// for (var i = 0; i < n; i++) {
//   groupTable[i] = []
//   for (var j = 0; j < n; j++) {
//     groupTable[i][j] = 0;
//   }
// }

// // ['A', 'B', 'C'] - users in group
// // add a transaction - A pays 90 (A is index 0)
// var temp = 90/n;
// // in row 0, add temp to every column except column 0
// var index = 0;
// for (var i = 0; i < n; i++) {
//   if (i != index) {
//     groupTable[index][i] -= temp;
//     groupTable[i][index] += temp;

//   }
// }

// console.log(groupTable)

// // add a transaction - B pays 18 (B is index 1)
// temp = 18/n;
// // in row 1, add temp to every column except column 1
// index = 1;
// for (var i = 0; i < n; i++) {
//   if (i != index) {
//     groupTable[index][i] -= temp;
//     groupTable[i][index] += temp;

//   }
// }

// console.log(groupTable)




