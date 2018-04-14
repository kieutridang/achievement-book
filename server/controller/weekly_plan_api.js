var dataWeekly = require('./data_weekly_plan');

module.exports = {
	getWeeklyPlan: function (req, res) {
		try {
			var Weekly = require('../models/weeklyPlan');
			var weeklyPlan = {
				userId: req.session.user._id,
				startDate: req.params.startDate
			}
			var findingWeeklyPlan = new Weekly(weeklyPlan);
			var err = findingWeeklyPlan.validateSync();
			if (err) {
				res.status(404).end('Invalid weekly plan');
			}
			else {
				dataWeekly.findWeeklyPlan(weeklyPlan, function (error, data) {
					if (error) {
						res.status(500).end(error);
					}
					else {
						if (data.length == 0) {
							dataWeekly.createWeeklyPlan(weeklyPlan, function (error, newData) {
								if (error) {
									res.status(500).end(error);
								}
								else {
									res.status(200).end(JSON.stringify(newData));
								}
							})
						}
						else {
							res.status(200).end(JSON.stringify(data[0]));
						}
					}

				})
			}
		} catch (error) {
			res.status(500).end(error);
		}
	},

	createWeeklyPlan: function (req, res) {
		try {
			var Weekly = require('../models/weeklyPlan');
			var weeklyPlan = {};
			//???????????????????????????????
			Object.keys(req.body).map((key) => {
				weeklyPlan[key] = req.body[key];
			})
			weeklyPlan.userId = req.session.user._id;
			weeklyPlan.startDate = req.params.startDate;
			var newWeeklyPlan = new Weekly(weeklyPlan);
			var err = newWeeklyPlan.validateSync();
			if (err) {
				res.status(403).end("Invalid weekly plan");
			}
			else {
				dataWeekly.findWeeklyPlan({ userId: weeklyPlan.userId, startDate: weeklyPlan.startDate }, function (error, data) {
					if (error) {
						res.status(500).end(error);
					}
					else {
						if (data.length == 0) {
							dataWeekly.createWeeklyPlan(weeklyPlan, function (error, newData) {
								if (error) {
									res.status(500).end(error);
								}
								else {
									res.status(200).end(JSON.stringify(newData));
								}
							})
						}
						else {
							res.status(403).end('Weekly plan existed');
						}
					}
				})
			}
		} catch (error) {
			res.status(500).end();
		}
	},

	updateWeeklyPlan: function (req, res) {
		try {
			var Weekly = require('../models/weeklyPlan');
			if (req.body.startDate || req.body.userId) {
				res.status(403).end('You are not allowed to edit date or user');
			}
			else {
				var weeklyPlan = {};
				Object.keys(req.body).map((key) => {
					weeklyPlan[key] = req.body[key];
				})
				weeklyPlan.userId = req.session.user._id;
				weeklyPlan.startDate = req.params.startDate;
				var newWeeklyPlan = new Weekly(weeklyPlan);
				var err = newWeeklyPlan.validateSync();
				if (err) {
					res.status(403).end("Invalid weekly plan");
				}
				else {
					dataDaily.updateWeeklyPlan({ userId: weeklyPlan.userId, startDate: weeklyPlan.startDate }, weeklyPlan, function (error, data) {
						if (error) {
							res.status(500).end(error);
						}
						else {
							res.status(200).end(JSON.stringify(data));
						}
					})
				}
			}
		} catch (error) {
			res.status(500).end();
		}
	}
}