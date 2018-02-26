var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    id: { type: String },
    title: { type: String },
    content: { type: String },
    time: {
        type: String,
        validate: {
            validator: function (value){
                if (moment(value, 'YYYY-MM-DD', true).format() == "Invalid date")
                    return false;
                else return true;
            },
            message: 'Invalid date'
        }
    }
})

module.exports = mongoose.model('Notification', NotificationSchema);