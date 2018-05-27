var db = require('../../database');
var Sequelize = require('sequelize');

// define model for users table

var Transaction = db.define('Transaction', {
  amount: {
    type: Sequelize.INTEGER
  },
  bill: {
    type: Sequelize.STRING
  }
});

module.exports = Transaction;
