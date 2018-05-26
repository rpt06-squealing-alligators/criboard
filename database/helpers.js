var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Issues = require('./models/issues.js');

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
            // // console.log('new user created', result)
            // // grab the last inserted id in database
            // User.findOne({
            //   where: {username: username}
            // })
            //   .then((result) => {
            //     //login comes from passport and creates a session and a cookie for the user
            //     // console.log(result.dataValues)
            //     // callback(true);
            //   })
            console.log('new user result', result)
          })
      } else {
        // username already exists in database
        console.log('username already exists');
        // callback(false);
      }
    })
}

var reportIssue = (title, description, image) => {
  // console.log('title: ', title)
  // console.log('title: ', description)
  // console.log('title: ', image)
  Issues.create({
    title: title,
    description: description,
    image: image
  });
}

var selectIssues = (cb) => {
  console.log('selectIssues is being called')
  Issues.findOne({attributes: ['title']})
  .then(result => cb(result))
}

createUser('tester2', 'test', 'test')

module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues
};