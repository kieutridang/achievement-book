const express = require('express')
const user = require('./controller/user')

module.exports = function(app) {
    var router = express.Router()
    
    router.post('/user/createuser', user.createUser)
    router.get('/user/userid/:_id', user.findUser)
    app.use('/api', router)
}