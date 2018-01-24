var mongoose = require('mongoose')

exports.findUser = function(db, res, data, callback) {
  var User = require('../models/user')(db)
  User.find(data, function(err, data){
      if (err) return res.status(500).send(err);
      callback(data);
  })
}

exports.createUser = function(db, res, data) {
  var User = require('../models/user')(db)
  var newUser = new User(data)
  newUser.save(function(err, data) {
    if (err) res.status(500).send(err)
    else {
      console.log(data)
    }
  })
}

exports.updateUser = function(db, res, condition, data, callback) {
  var User = require('../models/user')(db)
  User.findOneAndUpdate(condition, data, {$new: false}, function(err, model) {
    if (err) res.status(500).send(err) 
    else {
      callback(model)
    }
  })
}

exports.deleteUser = function(db, res, condition, callback) {
  var User = require('../models/user')(db)
  User.findByIdAndRemove(condition, (err, data) => {
    if (err) res.status(500).send(err) 
    else {
      callback(data)
    }
  })
}