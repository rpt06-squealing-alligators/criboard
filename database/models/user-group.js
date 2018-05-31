var db = require('../../database');
var Sequelize = require('sequelize');

// define model for a join table between users and groups tables

var UserGroup = db.define('Users_Group', {

});

module.exports = UserGroup;