const express = require('express')
const path = require('path')
const cors = require('cors');
const app = express()
const staticPath = '../dist';
const bodyParser = require('body-parser')

module.exports = function(app) {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true})) 

    app.use(cors({
        origin: true,
        credentials: true
    }))
    
    app.get(/^\/[a-z]*$/, (req, res) => {
        res.sendFile(path.join(__dirname, staticPath, '/index.html'))
    })
    
    app.use('/', express.static(path.join(__dirname, staticPath)))
    
}