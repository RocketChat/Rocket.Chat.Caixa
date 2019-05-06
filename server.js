require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { JWTRouter } = require('./JWT/router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.APP_PORT || 8888;

const allowCrossDomain = (req, res, next) => {
	const origin = req.headers.origin || req.headers.host;

	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if ('OPTIONS' == req.method) {
		res.status(200).send();
	} else {
		next();
	};
};

app.use(allowCrossDomain);
app.use('/api', JWTRouter);

app.listen(port);
console.log('Server running on port ' + port);
