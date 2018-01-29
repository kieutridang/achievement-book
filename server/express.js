const express = require('express')
const path = require('path')
const cors = require('cors');
const app = express()
const staticPath = '../dist';
const publicPath = '../assets'
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


module.exports = function(app) {
    app.use(bodyParser.json({
        limit: "50mb"
    }))
    app.use(bodyParser.urlencoded({extended: true})) 

    app.use(cors({
        origin: true,
        credentials: true
    }))
    
    app.get(/^\/[a-z]*$/, (req, res) => {
        res.sendFile(path.join(__dirname, staticPath, '/index.html'))
    })
    
    app.use('/', express.static(path.join(__dirname, publicPath)))
    
}