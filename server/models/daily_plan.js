var mongoose = require('mongoose');
var moment = required('moment');
var Schema = mongoose.Schema;

var DailyPlan = new Schema({
    id: {
        type: String
    },
    userId: {
        type: String,
        required: [true, "UserId is required"],
    },
    weeklyPlanId: {
        type: String
    },
    date: {
        type: String,
        required: [true, "Date is reqired"],
        validate: {
            validator: function(date){
                if (moment(v, 'YYYY-MM-DD', true).format() == "Invalid date")
                    return false;
                else return true;
            },
            message: 'Invalid date'
        }
    },
    quote: {
        type: String
    },
    plan: [
        {
            task: {
                type: String
            },
            from: {
                type: Date,
                validate: {
                    validator: function(time){
                        if (moment(time, 'hh:mm', true).format() == "Invalid date")
                            return false;
                        else return true;
                    },
                    message: 'Invalid time'
                }
            },
            process: {
                type: Number
            }
        }
    ],
    note: {
        type: String
    },
    bestTask: {
        type: String
    },
    whyBest: {
        type: String
    },
    bestTime: [
        {type: Boolean}
    ],
    effciency: {
        type: Number
    },
    lessonLearn: {
        type: String
    }
})

module.exports = mongoose.model('daily_plan', DailyPlan);