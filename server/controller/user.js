var dataUser = require('./data_user')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/achievement-book')

exports.findUser = function(req, res) {
  try {
    dataUser.findUser(res, req.params, function (data) {
      res.status(200).send(JSON.stringify(data));
    })
  } catch (ex) {
    res.status(500).send(ex);
  }
}

exports.createUser = function(req, res) {
  try {
    var newUser = req.body
    debugger
    dataUser.findUser(res, {username: newUser.username} , function(data) {
      debugger
      if (data.length != 0) {
        res.status(409).send('User is already exists');
        res.end();
      }
      else {
        debugger
        dataUser.createUser(res, newUser, () => {
          res.status(200).end('Create user successful');
        })
      }
    })
  } catch(ex) {
    res.status(500).send(ex)
  }
}

exports.updateUser = function(req, res) {
  try {
    var newUser = req.body;
    if (newUser.username || newUser.password) {
      res.status(403).send("You have no permission to change username or password")
      res.end();
      return;
    }
    else {
      dataUser.updateUser(res, req.params, newUser, function(err, data) {
        res.status(200).send("Update succeeded");
        res.end();
      })
    }
  } catch (ex) {
    res.status(500).send(ex)
  }
}

exports.deleteUser = function(req, res) {
  try {
    dataUser.deleteUser(res, req.params._id, (data) => {
      res.status(200).send('Delete succeeded')
    })
  } catch (ex) {
    res.status(500).send(ex)
  }
}