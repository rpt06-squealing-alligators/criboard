var db = require('../database');

// define model for users table

var User = db.define('User', {
  username: {
    type: Sequelize.STRING
  }
});

// User.sync()

module.exports = User;

