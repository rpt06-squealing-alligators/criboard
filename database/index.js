// create a database connection and export it

var Sequelize = require('sequelize');
var db = require('../config.js');

var connection = new Sequelize(db.DBNAME, db.DBUSERNAME, db.DBPASSWORD, {
  host: db.DBHOST,
  // port: db.DBPORT,
  dialect: 'mysql',
  // dialectOptions: {
  //   ssl: 'Amazon RDS'
  // }
});

// var connection = new Sequelize(process.env.DATABASE_URL);
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
