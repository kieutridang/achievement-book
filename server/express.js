const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const staticPath = '../dist';
const publicPath = '../assets';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app) {

    app.use(morgan('dev'));

    mongoose.connect('mongodb://localhost/achievement-book');

    app.use(bodyParser.json({
        limit: "50mb"
    }))
    app.use(bodyParser.urlencoded({extended: true})) 

    app.use(cors({
        origin: true,
        credentials: true
    }))

    app.use(session({
        secret: 'achievement-book',
        resave: false,
        saveUninitialized: true,
        httpOnly: true,
        cookie: {
            maxAge: 5 * 60 * 1000
        },
        store: new MongoStore({
            url: 'mongodb://localhost/achievement-book',
            ttl: 5
        })
    }))
    
    app.get(/^\/[a-z]*$/, (req, res) => {
        res.sendFile(path.join(__dirname, staticPath, '/index.html'))
    })
    
    app.use('/', express.static(path.join(__dirname, publicPath)))
    
}