var Sequelize = require('sequelize');

var User = require('./models/user.js');

// save username, email and password in database
// check if username already exists in database, if not insert user info into database
var createUser = (username, email, password, callback) => {
  User.findOne({
    where: {username: username}
  })
    .then((result) => {
      // console.log(result)
      // if user doesn't exist
      if (result === null) {
        User.create({
          username: username, email: email, password: password
        })
          .then((result) => {
            // console.log('new user created', result)
            callback(true);
          })
      } else {
        // username already exists in database
        console.log('username already exists');
        callback(false);
      }
    })
}

// createUser('test', 'test', 'test')

module.exports = {
  createUser: createUser
};