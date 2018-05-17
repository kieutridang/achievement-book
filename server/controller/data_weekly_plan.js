var mongoose = require('mongoose');

module.exports = {
	findWeeklyPlan: function (data, callback) {
		var Weekly = require('../models/weeklyPlan');
		Weekly.find(data, function (err, data) {
			if (callback) callback(err, data);
		})
	},

	createWeeklyPlan: function (data, callback) {
		var Weekly = require('../models/weeklyPlan');
		var newWeeklyPlan = new Weekly(data);
		newWeeklyPlan.save(function (err, newData) {
			if (callback) callback(err, newData);
		})
	},

	updateWeeklyPlan: function (condition, data, callback) {
		var Weekly = require('../models/weeklyPlan');
		Weekly.findOneAndUpdate(condition, data, { new: false, upsert: true, runValidators: true }, function (err, model) {
			if (callback) callback(err, model);
		})
	},

	deleteWeeklyPlan: function (condition, callback) {
		var Weekly = require('../models/weeklyPlan');
		Weekly.findByIdAndRemove(condition, function (err, data) {
			if (callback) callback(err, data);
		})
	}
}