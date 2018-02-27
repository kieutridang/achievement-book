var mongoose = require('mongoose');

module.exports = {
    findPlan: function(data, callback){
        var Daily = require('../models/daily_plan');
        Daily.find(data, function(err, data){
            callback(err, data);
        })
    },

    createPlan: function(data, callback){
        var Daily = require('../models/daily_plan');
        var newPlan = new Daily(data);
        newPlan.save(function(err, data){
            callback(err, data);
        })
    },

    updatePlan: function(condition, data, callback){
        var Daily = require('../models/daily_plan');
        Daily.findOneAndUpdate(condition, data, {$new: false}, function(err, model){
            callback(err, model);
        })
    },

    deletePlan: function(condition, callback) {
        var Daily = require('../models/daily_plan');
        Daily.findByIdAndRemove(condition, function(err, data){
            callback(err, data);
        }) 
    }
}