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
  },
 latitude: {
    type: Sequelize.DECIMAL,
    defaultValue: 42.09
  },
  longitude: {
    type: Sequelize.DECIMAL,
    defaultValue: -72.58
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: "123 Main St; Springfield, MA 01105"
  }
});

module.exports = User;
