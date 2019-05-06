const rockechatUrl = process.env.ROCKETCHAT_URL;
const livechatApiUrl = `${rockechatUrl}/api/v1/livechat`;

exports.settings = {
	rockechatUrl,
	livechatApiUrl,
};
