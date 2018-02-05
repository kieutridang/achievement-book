var dataUser = require('./data_user');

module.exports = {
    createUser: function (req, res) {
        try {
            var newUser = req.body
            dataUser.findUser({ username: newUser.username }, function (err, data) {
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
        } catch (ex) {
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
                dataUser.updateUser({ _id: req.session.user._id }, newUser, function (err, data) {
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

    login: function(req, res){
        try {
            var { username, password } = req.body;
            dataUser.findUser({ username: username }, function (err, data) {
                if (err) {
                    res.status(500).end(err);
                }
                else {
                    if (data.length <= 0) {
                        res.status(404).end('User not found');
                    }
                    else {
                        var User = require('../models/user');
                        var user = new User(data[0]);
                        user.verifyPassword(password, function(err, valid){
                            if (err) {
                                res.status(500).end(err);
                                return;
                            }
                            if (valid) {
                                req.session.regenerate(function () {
                                    req.session.user = {
                                        _id: user._id
                                    }
                                    res.status(200).end('Logged in successfully');
                                })
                            }
                            else {
                                res.status(401).end('Incorrect password');
                            }
                        })
                    }
                }
            })
        } catch (err) {
            res.status(500).end(err);
        }
        
    },

    logout: function(req, res){
        try {
            req.session.destroy(function(err){
                if (err) {
                    res.status(500).end(err);
                }
                else {
                    res.status(200).end('Logged out successfully');
                }
            })
        } catch (err) {
            res.status(500).end(err);
        }
    },

    authenticate: function(req, res, next){
        try {
            if (req.session.user){
                next();
            }
            else {
                res.status(401).end('No permission, need login');
            }
        } catch (err) {
            res.status(500).end(err);
        }
    },

    checkAuthenticate: function(req, res){
        try {
            if (req.session.user){
                res.status(200).end('Logged in');
            }
            else {
                res.status(401).end('Not logged in');
            }
        } catch (err) {
            res.status(500).end(err);
        }
    },

    getUser: function(req, res){
        try {
            dataUser.findUser({_id: req.session.user._id }, function(err, data){
                if (err){
                    res.status(500).end(err);
                }
                else {
                    if (data.length <= 0){
                        res.status(404).end('User not found');
                    }
                    else {
                        var user = data[0];
                        res.status(200).end(JSON.stringify(user));
                    }
                }
            }) 
        } catch (err) {
            res.status(500).end(err);
        }
    },

    deleteUser: function (req, res) {
        try {
            dataUser.deleteUser({_id: req.session.user._id}, (err, data) => {
                if (err) res.status(500).send(err).end();
                res.status(200).send('Delete succeeded').end();
            })
        } catch (ex) {
            res.status(500).send(ex).end();
        }
    }
}