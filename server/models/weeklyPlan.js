var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var WeeklyPlan = new Schema({
  id: {
    type: String,
  },
  userId: {
    type: String,
    required: [true, 'UserId is required']
  },
  monthlyPlanId: {
    type: String
  },
  startDate: {
    type: String,
    validate: {
			validator: function (date) {
        if (moment(date, 'YYYY-MM-DD', true).format() == "Invalid date"
            && moment(date).isoWeekday() != 1)
					return false;
				else return true;
			},
			message: 'Invalid date'
		}
  },
  goal: {
    type: String
  },
  tasksPlanning: [{
    type: String
  }],
  schedule: [{
    mission: {
      type: String
    },
    description: {
      type: String
    },
    milestones: [{
      description: {
        type: String
      },
      task: {
        type: Number
      },
      day: {
        type: Number
      }
    }]
  }],
  bestCompletedTask: {
    type: String
  },
  lessonLearned: [{
    type: String
  }],
  mostEnthusiasticDays: [{
    type: Boolean
  }],
  taskRating: {
    type: Number,
    min: 0,
    max: 5
  },
  memo: {
    type: String
  },
  experience: [{
    problem  : { type: String },
    reason   : { type: String },
    solution : { type: String }
  }]
});

module.exports = mongoose.model('weekly_plan', WeeklyPlan);