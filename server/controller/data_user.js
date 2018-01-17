import { request } from 'https';

var mongoose = require('mongoose')

exports.findUser = function(db, data, callback) {
  var User = require('../models/user')(db)
  User.findOne(data, function(err, data){
      if (err) return console.log(err);
      callback(data);
  })
}

exports.createUser = function(db, data) {
  var User = require('../models/user')(db)
  data.save(function(err, data) {
    if (err) console.log(err)
    else {
      User.find(data, function(err, data){
        console.log(data);
      })
    }
  })
}