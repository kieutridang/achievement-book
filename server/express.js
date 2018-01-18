const express = require('express')
const path = require('path')
const app = express()

const staticPath = '../dist';
var database = require('./database');

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "http://localhost:8081");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/api/testGet', (req, res) => {
    res.end('testSuccessfully');
})

app.get(/^\/[a-z]*$/, (req, res) => {
    res.sendFile(path.join(__dirname, staticPath, '/index.html'))
})

app.use('/', express.static(path.join(__dirname, staticPath)))

app.listen(8080, () => { console.log('Server running on port 8080')});
