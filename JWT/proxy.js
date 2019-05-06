const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const { requests } = require('../lib/requests');

const clockTolerance = process.env.JWT_CLOCK_TOLERANCE || 10; //value in seconds
const ignoreExpiration = process.env.JWT_IGNORE_EXPIRATION || false;
const algorithms = process.env.JWT_ALGORITHMS || ['RS256'];

async function verifyJWT(req, res, next) {
	const token = req.body && req.body.token;
	/*
	if (!req.headers.authorization || req.headers.authorization === null) {
		return res.status(401).send({ success: false, message: 'No token' });
	}

	const token = req.headers.authorization.replace('Bearer ', '');
	*/

	try {
		if (!token) {
			return res.status(401).send({ success: false, message: 'No token provided.' });
		}

		const decoded = jwtDecode(token);
		if (!decoded.iss) {
			return res.status(401).send({ success: false, message: `Error decoding JWT. Field 'iss' is missing.` });
		}

		body = await requests.get(decoded.iss);
		if (!body.public_key) {
			return res.status(500).send({ success: false, message: `Error decoding JWT. Field 'public_key' is missing.` });
		}

		const pub = `-----BEGIN PUBLIC KEY-----\n${body.public_key}\n-----END PUBLIC KEY-----\n`;
		jwt.verify(token, pub, { algorithms, ignoreExpiration, clockTolerance });
		req.decoded = decoded;
	} catch (error) {
		return res.status(500).send({ success: false, message: 'Error validating JWT.', error });
	}

	next();
}

exports.JWTProxy = {
	verifyJWT,
};

