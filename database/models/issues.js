var db = require('../../database');
var Sequelize = require('sequelize');

// define model for issues table

var Issues = db.define('Issues', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.BLOB
  }
  ,
  handyman: {
    type: Sequelize.STRING
  },
  visit: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  holdup: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
});

Issues.sync()

module.exports = Issues;