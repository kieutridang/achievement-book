var dataDaily = require('./data_daily_plan');

module.exports = {
    getPlan: function(req, res) {
        var Daily = require('../models/daily_plan');
        try {
            var plan = {
                userId: req.session.user._id,
                date: req.body.date 
            }
            var findingPlan = new Daily(plan);
            var err = findingPlan.validateSync();
            if (err){
                res.status(404).end('Not found daily plan');
            }
            else {
                dataDaily.findPlan(plan, function(error, data){
                    if (error) {
                        res.status(500).end(error);
                    }
                    else {
                        if (data.length == 0){
                            dataDaily.createPlan(plan, function(error, data){
                                if (error) {
                                    res.status(500).end();
                                }
                                else {
                                    res.status(200).end(data);
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
    }
}