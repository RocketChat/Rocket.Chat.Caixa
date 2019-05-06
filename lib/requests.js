const request = require('request');

const post = (url, data) => {
	return new Promise((resolve, reject) => {
		request.post({
			headers: { 'content-type': 'application/json' },
			url,
			body: JSON.stringify(data)
		}, (error, response, body) => {
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

const get = (url) => {
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

exports.requests = {
	post,
	get,
};
