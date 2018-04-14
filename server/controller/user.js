var dataUser = require('./data_user')

module.exports = {
  findUser: function(req, res) {
    try {
      dataUser.findUser(req.params, function (err, data) {
        if (err) res.status(500).send(err).end();
        else 
        res.status(200)
        .send(JSON.stringify(data))
        .end();
      })
    } catch (ex) {
      res.status(500).send(ex).end();
    }
  },
  
  createUser: function(req, res) {
    try {
      var newUser = req.body
      dataUser.findUser({username: newUser.username} , function(err, data) {
        if (err) {
          res.status(500).send(err).end();
          return;
        }
        if (data.length != 0) {
          res.status(409).send('User is already exists').end();
        }
        else {
          dataUser.createUser(newUser, (err, data) => {
            if (err) res.status(500).send(err).end();
            else res.status(200).end('Create user successful');
          })
        }
      })
    } catch(ex) {
      res.status(500).send(ex).end();
    }
  },
  
  updateUser: function(req, res) {
    try {
      var newUser = req.body;
      if (newUser.username || newUser.password) {
        res.status(403).send("You have no permission to change username or password").end();
        return;
      }
      else {
        dataUser.updateUser(req.params, newUser, function(err, data) {
          if (err) res.status(500).send(err).end();
          else {
            res.status(200).send("Update succeeded").end();
          }
        })
      }
    } catch (ex) {
      res.status(500).send(ex).end();
    }
  },
  
  deleteUser: function(req, res) {
    try {
      dataUser.deleteUser(req.params._id, (err, data) => {
        if (err) res.status(500).send(err).end();
        res.status(200).send('Delete succeeded').end();
      })
    } catch (ex) {
      res.status(500).send(ex).end();
    }
  }
}