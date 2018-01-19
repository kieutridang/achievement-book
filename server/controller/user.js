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
    var newUser = req.body
    dataUser.findUser(db, {username: newUser.username} , function(data) {
      if (data) {
        res.status(409).send('User is already exists');
        res.end();
      }
      else {
        dataUser.createUser(db, newUser);
        res.status(200).end();
      }
    })
  } catch(ex) {
    res.status(500).send(ex)
  }
}