const express = require('express')
const path = require('path')
const app = express()

const staticPath = '../dist';
var database = require('./database');

app.get('/api/testGet', (req, res) => {
    res.end('testSuccessfully');
})

app.get(/^\/[a-z]*$/, (req, res) => {
    res.sendFile(path.join(__dirname, staticPath, '/index.html'))
})

app.use('/', express.static(path.join(__dirname, staticPath)))

app.listen(8080, () => { console.log('Server running on port 8080')});
