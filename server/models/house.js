var mongoose = require('mongoose')
var Schema = mongoose.Schema

var _Schema = new Schema({
  square: {
    type: Number,
    required: true
  },
  numberOfBedrooms: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = function(db) {
  return db.model('HouseInfo', _Schema);
}
