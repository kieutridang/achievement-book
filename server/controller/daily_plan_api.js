var dataDaily = require('./data_daily_plan');

module.exports = {
    getPlan: function(req, res) {
        try {
            var Daily = require('../models/daily_plan');
            var plan = {
                userId: req.session.user._id,
                date: req.body.date 
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
                                    res.status(500).end();
                                }
                                else {
                                    res.status(200).end(newData);
                                }
                            })
                        }
                        else {
                            res.status(200).end(data[0]);
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
            var plan = {
                userId: req.session.user._id,
                date: req.body.date,
            }
            var newPlan = new Daily(plan);
            var err = newPlan.validateSync();
            if (err){
                res.status(403).end("Invalid daily plan");
            }
            else {
                dataDaily.createPlan(plan, function(error, data){
                    if (error) {
                        res.status(500).end(error);
                    }
                    else {
                        res.status(200).end('Created plan succesfully');
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
            var plan = {
                userId: req.session.user._id,
                date: req.body.date
            }
            var newPlan = new Daily(plan);
            var err = newPlan.validateSync();
            if (err) {
                res.status(403).end("Invalid daily plan");
            }
            else {
                dataDaily.updatePlan(plan, function (error, data) {
                    if (error) {
                        res.status(500).end(error);
                    }
                    else {
                        res.status(200).end('Updated plan succesfully');
                    }
                })
            }
        } catch (error) {
            res.status(500).end();
        }
    }
}