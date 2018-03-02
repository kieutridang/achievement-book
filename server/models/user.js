var mongoose = require('mongoose')
var Bcrypt = require('mongoose-bcrypt')
var moment = require('moment');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: { type: String },
  avatar: {
    type: String,
    required: [true, "Avatar is required"],
  },
  username: { 
    type: String, 
    required: [true, "Username is required"],
    minlength: [6, "Username is at least 6 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password is at least 6 characters"],
    bcrypt: true
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"], 
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
    validate: {
      validator: function (v) {
        if (moment(v, 'YYYY-MM-DD', true).format() == "Invalid date")
          return false;
        else return true;
      },
      message: 'Invalid date'
    },
    required: [true, "Date of Birth is required"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  }
});

UserSchema.plugin(Bcrypt);

module.exports = mongoose.model('UserInfo', UserSchema)
