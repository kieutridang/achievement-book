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
  missions: [{
    name: {
      type: String
    },
    description: {
      type: String
    }
  }],
  days: [{
    milestones: [{
      name: {
        type: String
      },
      description: {
        type: String
      },
      mission: {
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
    cause    : { type: String },
    solution : { type: String }
  }]
});

module.exports = mongoose.model('weekly_plan', WeeklyPlan);