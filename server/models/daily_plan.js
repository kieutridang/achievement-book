var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailyPlan = new Schema({
    id: {
        type: String
    },
    userId: {
        type: String
    },
    weeklyPlanId: {
        type: String
    },
    date: {
        type: String
    },
    quote: {
        type: String
    },
    plan: {
        type: [{
            task: {
                type: String
            },
            from: {
                type: Date
            },
            process: {
                type: Number
            }
        }]
    },
    note: {
        type: String
    },
    bestTask: {
        type: String
    },
    whyBest: {
        type: String
    },
    bestTime: {
        type: [Boolean]
    },
    effciency: {
        type: Number
    },
    lessonLearn: {
        type: String
    }
})

module.exports = mongoose.model('daily_plan', DailyPlan);