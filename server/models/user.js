var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema = new Schema({
  id: { type: String },
  username: { 
    type: String, 
    required: [true, "Username is required"],
    minlength: [6, "Username is at least 6 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password is at least 6 characters"]
  },
  fullname: {
    type: String,
    required: [true, "Username is required"], 
    validate: {
      validator: function(v) {
        return !(/(^| )[a-z]/.test(v));
      },
      message: 'Your name need capitalized'
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        return /^[a-z0-9\.]*[a-z0-9]@[a-z]+\.([a-z]+\.)*[a-z0-9]+$/.test(v);
      },
      message: 'Email is not valid'
    }
  },
  DOB: {
    type: String,
    required: [true, "Date of Birth is required"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  }
});

module.exports = function(db) {
  return db.model('UserInfo', Schema)
}