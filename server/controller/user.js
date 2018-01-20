import { text } from '../../../../../.cache/typescript/2.6/node_modules/@types/body-parser';

var mongoose = require('mongoose')
var dataUser = require('./data_user')

mongoose.connect('mongodb://localhost/achievement-book')
var db = mongoose.connection

exports.findUser = function(req, res) {
  try {
    debugger
    dataUser.findUser(db, req.params, function (data) {
      debugger
      res.status(200).send(JSON.stringify(data));
    })
  } catch (ex) {
    res.status(500).send(ex);
  }
}

exports.createUser = function(req, res) {
  try {
    var newUser = req.body
    dataUser.findUser(db, {username: newUser.username} , function(data) {
      if (data.length != 0) {
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

exports.updateUser = function(req, res) {
  try {
    var newUser = req.body;
    if (newUser.username) {
      res.status(403).send("You have no permission to change username")
      res.end();
      return;
    }
    dataUser.updateUser(db, req.params, newUser, function(err, data) {
      if (err) {
        console.log(err)
        return;
      }
      res.status(200).send("Update successfuly");
      res.end();
    })
  } catch (ex) {
    res.status(500).send(ex)
  }
}