var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var DailyPlan = new Schema({
    id: {
        type: String
    },
    userId: {
        type: String,
        required: [true, 'UserId is required']
    },
    weeklyPlanId: {
        type: String
    },
    date: {
        type: String,
        validate: {
            validator: function (date) {
                if (moment(date, 'YYYY-MM-DD', true).format() == "Invalid date")
                    return false;
                else return true;
            },
            message: 'Invalid date'
        },
        required: [true, 'Date is required']
    },
    quote: {
        type: String,
        default: '',
    },
    plan: [{
        task: {
            type: String
        },
        from: {
            type: String,
            validator: {
                validate: function (time) {
                    if (moment(time, 'hh:mm', true).format() == "Invalid date")
                        return false;
                    else return true;
                },
                message: 'Invalid date'
            }
        },
        process: {
            type: Number
        }
    }],
    note: {
        type: String,
        default: '',
    },
    bestTask: {
        type: String,
        default: '',
    },
    whyBest: {
        type: String,
        default: '',
    },
    bestTime: [{
        type: Boolean
    }],
    effciency: {
        type: Number,
        min: 0,
        max: 4,
    },
    lessonLearn: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('daily_plan', DailyPlan);