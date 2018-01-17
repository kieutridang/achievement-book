var exports = module.exports = {}
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/achievement-book');
var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to DB');
})