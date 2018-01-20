var mongoose = require('mongoose')

exports.findUser = function(db, data, callback) {
  var User = require('../models/user')(db)
  User.find(data, function(err, data){
      if (err) return console.log(err);
      callback(data);
  })
}

exports.createUser = function(db, data) {
  var User = require('../models/user')(db)
  var newUser = new User(data)
  newUser.save(function(err, data) {
    if (err) console.log(err)
    else {
      User.find(data, function(err, data){
        console.log(data);
      })
    }
  })
}

exports.updateUser = function(db, condition, data, callback) {
  var User = require('../models/user')(db)
  User.findOneAndUpdate(condition, data, {$new: false}, function(err, model) {
    callback(err, model)
  })
}