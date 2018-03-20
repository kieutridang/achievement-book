var moment = require('moment');
var User = require('./data_user');
var DailyPlan = require('./data_daily_plan')

module.exports.moveTaskAutomatically = function () {
  User.findUser({}, (err, listUser) => {
    listUser.forEach(userInfo => {
      let today = moment().format('YYYY-MM-DD');
      DailyPlan.findPlan({ userId: userInfo._id, date: today }, (err, todayPlanData) => {
        todayPlanData = todayPlanData[0];
        let tommorow = moment().add(1, 'd').format('YYYY-MM-DD');

        DailyPlan.findPlan({ userId: userInfo._id, date: tommorow }, (err, tommorowPlanData) => {
          if (tommorowPlanData.length == 0) {
            DailyPlan.createPlan({ userId: userInfo._id, date: tommorow }, (err, tommorowPlanData) => {
              let incompletePlan = todayPlanData.plan.filter(plan => {
                if (plan.process != 100) return plan;
              });
              let bestTime = todayPlanData.bestTime.map(element => { return element });
              DailyPlan.updatePlan({ userId: userInfo._id, date: tommorow }, { plan: incompletePlan, bestTime: bestTime }, () => { });
            })
          }
          else {
            let incompletePlan = todayPlanData.plan.filter(plan => {
              if (plan.process != 100 && plan.task) return plan;
            });
            let bestTime = todayPlanData.bestTime.map(element => { return element });
            DailyPlan.updatePlan({ userId: userInfo._id, date: tommorow }, { plan: incompletePlan, bestTime: bestTime }, () => { });
          }
        })
      })
    });
  });
}