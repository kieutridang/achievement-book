const express = require('express')
const path = require('path')
const security = require('./security')
const app = express()
const staticPath = '../dist';
const api = require('./apiRouter');

app.get(/^\/[a-z]*$/, (req, res) => {
    res.sendFile(path.join(__dirname, staticPath, '/index.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, staticPath, '/index.html'))
})

app.use('/', express.static(path.join(__dirname, staticPath)))

app.use('/api', api);

app.listen(8080, () => { 'Server running on port 8080' });
