var db = require('../../database');
var Sequelize = require('sequelize');

// define model for users table

var Ledgers = db.define('Ledgers', {
  matrixRow: {
    type: Sequelize.STRING
  },
  matrixColumn: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.INTEGER
  },
});

module.exports = Ledgers;

//https://stackoverflow.com/questions/1138777/how-to-represent-a-2-d-data-matrix-in-a-database