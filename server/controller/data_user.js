var mongoose = require('mongoose')

exports.findUser = function(res, data, callback) {
  debugger
  var User = require('../models/user')
  User.find(data, function(err, data){
      if (err) return res.status(500).send(err);
      callback(data);
  })
}

exports.createUser = function(res, data, callback) {
  var User = require('../models/user')
  var newUser = new User(data)
  debugger
  newUser.save(function(err, data) {
    debugger
    if (err) res.status(500).send(err)
    else {
      console.log(data)
      callback();
    }
  })
}

exports.updateUser = function(res, condition, data, callback) {
  var User = require('../models/user')
  User.findOneAndUpdate(condition, data, {$new: false}, function(err, model) {
    if (err) res.status(500).send(err) 
    else {
      callback(model)
    }
  })
}

exports.deleteUser = function(res, condition, callback) {
  var User = require('../models/user')
  User.findByIdAndRemove(condition, (err, data) => {
    if (err) res.status(500).send(err) 
    else {
      callback(data)
    }
  })
}