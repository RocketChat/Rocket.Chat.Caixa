require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwtDecode = require('jwt-decode');
const request = require('request');
const jwt = require('jsonwebtoken');
const livechatProxy = require('./livechatProxy');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.APP_PORT || 8888;
const clockTolerance = process.env.JWT_CLOCK_TOLERANCE || 10; //value in seconds
const ignoreExpiration = process.env.JWT_IGNORE_EXPIRATION || false;
const algorithms = process.env.JWT_ALGORITHMS || ['RS256'];
const router = express.Router();

function getRequest(url) {
	return new Promise((resolve, reject) => {
		request(url, { json: true }, (error, response, body) => {
			if (error || response === null || response === undefined) {
				return reject({ success: false, message: 'Request failed. Please check your network connection.' });
			}

			if (response.statusCode != 200) {
				return reject(JSON.parse(response.body));
			}
			resolve(body);
		});
	});
}

async function verifyJWT(req, res, next) {
	if (!req.headers.authorization || req.headers.authorization === null) {
		return res.status(401).send({ success: false, message: 'No token' });
	}

	const token = req.headers.authorization.replace('Bearer ', '');
	if (!token) {
		return res.status(401).send({ success: false, message: 'No token provided.' });
	}

	const decoded = jwtDecode(token);

	if (!decoded.iss) {
		return res.status(401).send({ success: false, message: `Error decoding JWT. Field 'iss' is missing.` });
	}

	try {
		body = await getRequest(decoded.iss);
	} catch (error) {
		const { success, message } = error;
		return res.status(500).send({ success, message });
	}

	if (!body.public_key) {
		return res.status(500).send({ success: false, message: `Error decoding JWT. Field 'public_key' is missing.` });
	}

	const pub = `-----BEGIN PUBLIC KEY-----\n${body.public_key}\n-----END PUBLIC KEY-----\n`;

	try {
		jwt.verify(token, pub, { algorithms, ignoreExpiration, clockTolerance });
	} catch (err) {
		return res.status(500).send({ success: false, message: 'Error validating JWT.' });
	}

	req.decoded = decoded;
	next();
}

router.get('/token/', verifyJWT, (req, res, next) => {
	livechatProxy.authGuest(req.decoded, res);
});

router.options('/token/', verifyJWT, (req, res, next) => {
	livechatProxy.authGuest(req.decoded, res);
});

const allowCrossDomain = (req, res, next) => {
	const origin = req.headers.origin || req.headers.host;

	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	/*
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		*/
	next();
	//}
};

app.use(allowCrossDomain);
app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);