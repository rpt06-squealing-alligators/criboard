var db = require('../../database');
var Sequelize = require('sequelize');

// define model for users table

var Transaction = db.define('Transaction', {
  amount: {
    type: Sequelize.INTEGER
  },
  paidby: {
    type: Sequelize.INTEGER
  },
  bill: {
    type: Sequelize.STRING
  }
});

Transaction.sync()

module.exports = Transaction;
