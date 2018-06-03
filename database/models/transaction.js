var db = require('../../database');
var Sequelize = require('sequelize');

// define model for transactions table

var Transaction = db.define('Transaction', {
  amount: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY
  },
  bill: {
    type: Sequelize.STRING
  }
});

module.exports = Transaction;
