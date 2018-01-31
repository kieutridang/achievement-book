var mongoose = require('mongoose')

exports.findUser = function(data, callback) {
  var User = require('../models/user')
  User.find(data, function(err, data){
      callback(err, data);
  })
}

exports.createUser = function(data, callback) {
  var User = require('../models/user')
  var newUser = new User(data)
  newUser.save(function(err, data) {
      callback(err, data);
  })
}

exports.updateUser = function(condition, data, callback) {
  var User = require('../models/user')
  User.findOneAndUpdate(condition, data, {$new: false}, function(err, model) {
    callback(err, model);
  })
}

exports.deleteUser = function(condition, callback) {
  var User = require('../models/user')
  User.findByIdAndRemove(condition, (err, data) => {
    callback(err, data);
  })
}