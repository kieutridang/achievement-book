var exports = module.exports = {}
var mongoose = require('mongoose')
var UserInfo = require('./models/user')(db)

mongoose.connect('mongodb://localhost/achievement-book');
var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to DB');
    var user1 = new UserInfo({
        username: "zigonk",
        password: "abcdef",
        fullname: "Nguyen Quang Thuc",
        email: "zthucnguyen99@gmail.com",
        DOB: 24-03-1999,
        gender: "Male"
    })
})