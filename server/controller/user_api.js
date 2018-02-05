var dataUser = require('./data_user');

module.exports = {
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

    profile: function(req, res){
        try {
            dataUser.findUser({_id: req.session.user._id }, function(err, data){
                console.log(data);
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
    }
}