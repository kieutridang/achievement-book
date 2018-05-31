const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const staticPath = '../dist';
const publicPath = '../public/';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
const helper = require('./controller/helper');
const cron = require('node-cron');
const DATA_URL = (process.env.NODE_ENV == 'production' ? "mongodb://test:test@ds121289.mlab.com:21289/achievement-book" : "mongodb://localhost/achievement-book");

module.exports = function (app) {

	app.use(morgan('dev'));
	//
	//mongodb://test:test@ds121289.mlab.com:21289/achievement-book

	mongoose.connect(DATA_URL, {
		useMongoClient: true
	});
	// mongoose.connect("mongodb://test:test@ds121289.mlab.com:21289/achievement-book", {
	// 	useMongoClient: true
	// });

	app.use(bodyParser.json({
		limit: "50mb"
	}))
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use(cors({
		origin: true,
		credentials: true
	}))

	let task = cron.schedule('59 23 * * *', helper.moveTaskAutomatically);
	task.start();
	app.use(session({
		secret: 'achievement-book',
		resave: false,
		saveUninitialized: false,
		httpOnly: true,
		cookie: {
			maxAge: 15 * 60 * 1000
		},
		store: new MongoStore({
			url: DATA_URL,
			ttl: 15 * 60,
		})
	}))

	app.use((req, res, next) => {
		req.session.touch();
		next()
	})

	app.get(/^((?!\/api)(\/[a-z0-9\-]*)*)*$/, (req, res) => {
		res.sendFile(path.join(__dirname, staticPath, '/index.html'));
	})
	app.use('/', express.static(path.join(__dirname, staticPath)));

	app.use('/public', express.static(path.join(__dirname, publicPath)))

}