const express = require('express')
const user = require('./controller/user')

module.exports = function(app) {
    var router = express.Router()
    
    router('/user/createuser', user.createUser)
    router('/user/userid/:_id', user.findUser)
    app.use('/api', router)
}