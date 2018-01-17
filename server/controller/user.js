var mongoose = require('mongoose')
var dataUser = require('./data_user')

mongoose.connect('mongodb://localhost/achievement-book')
var db = mongoose.connection

exports.findUser = function(req, res) {
  try {
    dataUser.findUser(db, req.params, function (data) {
      res.status(200).send(data);
    })
  } catch (ex) {
    res.status(500).send(ex);
  }
}

exports.createUser = function(req, res) {
  try {
    var User = require('./models/user')(db)
    var body = '';
    var newUser = {};
    req.on('data', (chunk) => {
      body += chunk;
    }).
    on('end', function() {
      newUser = JSON.parse(body)
      dataUser.findUser(db, {username: newUser.username} , function(data) {
        if (data.length > 0) {
          res.status(409).send('User is already exists');
          res.end();
        }
        else {
          dataUser.createUser(db, data);
          res.status(200).end();
        }
      })
    })

  } catch(ex) {
    res.status(500).send(ex)
  }
}