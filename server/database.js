var exports = module.exports = {};
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/achivement-book');
var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to DB');
})

exports.insert = function (dbName, data) {
        var User = require ('./models/user')(db);
        var newData = new User({username: data.username, password: data.password});
        newData.save(function(err, newData){
            if (err) return console.log(err);
            User.find(function (err, datas){
                if (err) return console.error(err);
            })
        })
}

exports.queryAll = function (dbName, callback) {
}

exports.findOne = function (dbName, userInfo, callback) {
        var User = require ('./models/user')(db);
        User.find(userInfo, function(err, datas){
            if (err) return console.log(err);
            if (datas.length > 0){
                callback(true);
            }
            else {
                callback(false);
            }   
        })
}

return module.exports;
