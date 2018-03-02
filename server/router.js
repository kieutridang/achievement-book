const express = require('express');
const user = require('./controller/user');
const userApi = require('./controller/user_api');
const dailyApi = require('./controller/daily_plan_api');

module.exports = function(app) {
    var router = express.Router()
    
    router.post('/user/createuser', userApi.createUser);
    router.get('/user/getuser/', userApi.authenticate, userApi.getUser);
    router.put('/user/updateuser', userApi.authenticate, user.updateUser);
    router.post('/user/login', userApi.login);
    router.post('/user/logout', userApi.authenticate, userApi.logout);
    router.get('/user/checkAuthenticate', userApi.checkAuthenticate);
    router.delete('/user/deleteuser', userApi.authenticate, userApi.deleteUser);

    router.get('/dailyplan/getplan/:date', userApi.authenticate, dailyApi.getPlan);
    router.post('dailyplan/createplan/:date', userApi.authenticate, dailyApi.createPlan);
    router.put('/dailyplan/updateplan/:date', userApi.authenticate, dailyApi.updatePlan);

    app.use('/api', router)
}