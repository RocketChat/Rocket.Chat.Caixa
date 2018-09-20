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
			if (error) reject(error);
			if (response.statusCode != 200) {
				reject(JSON.parse(response.body));
			}
			resolve(body);
		});
	});
}

async function verifyJWT(req, res, next) {
	const token = req.body && req.body.token;
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
		return res.status(500).send({ success: false, message: `Error fetching JWT data.` });
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

router.post('/token/', verifyJWT, (req, res, next) => {
	livechatProxy.authGuest(req.decoded, res);
});

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);