const express = require('express')
const user = require('./controller/user')
const house =require('./controller/house')

module.exports = function(app) {
    var router = express.Router()
    
    router.post('/user/createuser', user.createUser)
    router.get('/user/userid/:_id', user.findUser)

    router.post('/house/add-training-data', house.addData)
    router.get('/house/square/:square/bedroom/:numberOfBedrooms/distance/:distance', house.predictHousePrice)
    app.use('/api', router)
}