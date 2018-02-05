const express = require('express');
const user = require('./controller/user');
const userApi = require('./controller/user_api');

module.exports = function(app) {
    var router = express.Router()
    
    router.post('/user/createuser', userApi.createUser);
    router.get('/user/getuser/', userApi.authenticate, userApi.getUser);
    router.put('/user/updateuser', userApi.authenticate, user.updateUser);
    router.post('/user/login', userApi.login);
    router.post('/user/logout', userApi.logout);
    router.get('/user/checkAuthenticate', userApi.checkAuthenticate);
    router.delete('user/deleteuser', userApi.authenticate, userApi.deleteUser);

    app.use('/api', router)
}