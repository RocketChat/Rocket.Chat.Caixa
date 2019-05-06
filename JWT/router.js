"use strict";
const express = require('express');
const { JWTProxy } = require('./proxy');
const { livechatUtils } = require('../livechat/utils');
const router = express.Router();

router.post('/token/', JWTProxy.verifyJWT, (req, res, next) => {
	livechatUtils.authGuest(req.decoded, res);
});

router.options('/token/', JWTProxy.verifyJWT, (req, res, next) => {
	livechatUtils.authGuest(req.decoded, res);
});

exports.JWTRouter = router;
