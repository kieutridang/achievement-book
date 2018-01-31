var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema = new Schema({
  id                   : { type: String },
  userId               : { type: String },
  monthlyPlan          : { type: String },
  startDay             : { type: Date },
  goal                 : { type: String },
  tasks                : [{type: String}],
  weeklySchedule       : [{type: String}],
  percentComplete      : { type: Number },
  bestCompletedTask    : { type: String },
  lessonLearned        : [{type: String}],
  mostEnthusiasticDays : [{type: Boolean}],
  taskRating           : { type: String },
  memo                 : { type: String },
  experience           : [{
    problem  : { type: String },
    reason   : { type: String },
    solution : { type: String }
  }]
});

module.exports = mongoose.model('WeeklyPlan', Schema);