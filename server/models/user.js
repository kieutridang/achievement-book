var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    id: { type: String },
    username: { type: String, default: "" },
    password: { type: String, default: "" },                 // INCLUDED BY MONGOOSE BCRYPT
});

module.exports = function (db) {
    return db.model('User', Schema);
}