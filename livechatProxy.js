const request = require('request');
const rockechatUrl = process.env.ROCKETCHAT_URL;
const livechatUrl = `${rockechatUrl}/api/v1/livechat`;
const payloadRootData = process.env.PAYLOAD_ROOT_DATA || 'SIPER';

async function authGuest(payload, res) {
	const body = prepareData(payload);
	if (!body) {
		return res.status(500).send({ success: false, message: 'Invalid JWT payload.' });
	}

	const url = `${livechatUrl}/visitor`;

	try {
		result = await postRequest(url, body);
		const data = JSON.parse(result);
		const { success } = data;
		const { _id, token } = data.visitor;

		return res.status(200).send({ success, _id, token });
	} catch (error) {
		const { success, message } = error;
		return res.status(500).send({ success, message });
	}
}

const prepareData = (payload) => {
	const data = payload[payloadRootData];
	if (!data) {
		return;
	}

	const customFields = [];
	if (data.cpf) {
		customFields.push({ key: 'cpf', value: data.cpf, overwrite: true });
	}

	if (data.contas && Array.isArray(data.contas) && data.contas.length > 0) {
		const list = data.contas[0].split(',');

		list.forEach(function (item) {
			const field = item.split(':');
			customFields.push({ key: field[0], value: field[1], overwrite: true });
		});

	}

	const { token } = data;

	return {
		visitor: {
			name: data.nome,
			token,
			customFields
		}
	}
}

const postRequest = (url, data) => {
	return new Promise((resolve, reject) => {
		request.post({
			headers: { 'content-type': 'application/json' },
			url,
			body: JSON.stringify(data)
		}, (error, response, body) => {
			if (error) reject(error);
			if (response.statusCode != 200) {
				reject(JSON.parse(response.body));
			}
			resolve(body);
		});
	});
}

exports.authGuest = authGuest