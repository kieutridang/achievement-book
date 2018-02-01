const express = require('express');
var session = require('express-session');
var morgan = require('morgan');
const app = express()

app.use(morgan('dev'));

app.use(session(
    module.exports = {
        secret: 'achievement-book',
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        cookie: {
            maxAge: 600000
        }
    }
))

require('./server/express')(app)
require('./server/router')(app)

app.listen(8080, () => { console.log('Server running on port 8080')});