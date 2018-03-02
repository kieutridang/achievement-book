var dataDaily = require('./data_daily_plan');

module.exports = {
    getPlan: function(req, res) {
        try {
            var Daily = require('../models/daily_plan');
            var plan = {
                userId: req.session.user._id,
                date: req.params.date
            }
            var findingPlan = new Daily(plan);
            var err = findingPlan.validateSync();
            if (err){
                res.status(404).end('Invalid daily plan');
            }
            else {
                dataDaily.findPlan(plan, function(error, data){
                    if (error) {
                        res.status(500).end(error);
                    }
                    else {
                        if (data.length == 0){
                            dataDaily.createPlan(plan, function(error, newData){
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

    createPlan: function(req, res){
        try {
            var Daily = require('../models/daily_plan');
            var plan = {};
            Object.keys(req.body).map((key) => {
                plan[key] = req.body[key];
            })
            plan.userId = req.session.user._id;
            plan.date = req.params.date;
            var newPlan = new Daily(plan);
            var err = newPlan.validateSync();
            if (err){
                res.status(403).end("Invalid daily plan");
            }
            else {
                dataDaily.findPlan( {userId: plan.userId, date: plan.date}, function (error, data) {
                    if (error) {
                        res.status(500).end(error);
                    }
                    else {
                        if (data.length == 0) {
                            dataDaily.createPlan(plan, function (error, newData) {
                                if (error) {
                                    res.status(500).end(error);
                                }
                                else {
                                    res.status(200).end(JSON.stringify(newData));
                                }
                            })
                        }
                        else {
                            res.status(403).end('Daily plan existed');
                        }
                    }
                })
            }
        } catch (error) {
            res.status(500).end();
        }
    },

    updatePlan: function(req, res) {
        try {
            var Daily = require('../models/daily_plan');
            if (req.body.date || req.body.userId){
                res.status(403).end('You are not allowed to edit date or user');
            }
            else {
                var plan = {};
                Object.keys(req.body).map((key) => {
                    plan[key] = req.body[key];
                })
                plan.userId = req.session.user._id;
                plan.date = req.params.date;
                var newPlan = new Daily(plan);
                var err = newPlan.validateSync();
                if (err) {
                    res.status(403).end("Invalid daily plan");
                }
                else {
                    dataDaily.updatePlan( {userId: plan.userId, date: plan.date}, req.body, function(error, data) {
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