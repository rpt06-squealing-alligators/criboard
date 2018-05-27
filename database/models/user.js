var db = require('../../database');
var Sequelize = require('sequelize');

// define model for users table

var User = db.define('User', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;
