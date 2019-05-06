const { settings } = require('../lib/settings');
const { requests } = require('../lib/requests');
const payloadRootData = process.env.PAYLOAD_ROOT_DATA || 'SIPER';

async function authGuest(payload, res) {
	const body = normalizeData(payload);
	if (!body) {
		return res.status(500).send({ success: false, message: 'Invalid JWT payload.' });
	}

	const { livechatApiUrl } = settings;
	const url = `${livechatApiUrl}/visitor`;

	try {
		result = await requests.post(url, body);
		const data = JSON.parse(result);
		const { success } = data;
		const { _id, token } = data.visitor;

		return res.status(200).send({ success, _id, token });
	} catch (error) {
		const { success, message } = error;
		return res.status(500).send({ success, message });
	}
}

const normalizeData = (payload) => {
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

exports.livechatUtils = {
    authGuest,
}
