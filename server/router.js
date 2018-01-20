const express = require('express')
const user = require('./controller/user')

module.exports = function(app) {
    var router = express.Router()
    
    router.get('/user/getuser/userid/:_id', user.findUser)
    router.post('/user/createuser', user.createUser)
    router.put('/user/updateuser/userid/:_id', user.updateUser)
    app.use('/api', router)
}