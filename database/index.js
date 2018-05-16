// create a database connection and export it

var Sequelize = require('sequelize');
var db = require('../config.js');

var connection = new Sequelize(db.DBNAME, db.DBUSERNAME, db.DBPASSWORD, {
  host: db.DBHOST,
  dialect: 'mysql'
});

connection
  .authenticate()
  .then(() => {
    console.log(`connection to database has been established successfully`);
  })
  .catch(err => {
    console.log('unable to connect to database');
  });

// sync

connection.sync({
  logging: console.log
});

module.exports = connection;
