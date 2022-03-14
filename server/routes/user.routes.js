const express = require('express');
const userService = require('../services/user.service');
const ErrorResponse = require('./helpers/ErrorResponse');
const useAuthMiddleware = require('./middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router.get('/', useAuthMiddleware(), async (req, res) => {
	const userId = req.token.userId;

	try {
		const userData = (await userService.findById(userId))._doc;
		delete userData.password;
		console.log(userData);
		res.status(200).json(userData);
	} catch (err) {
		const errResponse = new ErrorResponse(500, 'DB_ERROR: ' + err?.message || err?.toString());
		return res.status(500).json(errResponse);
	}
});

module.exports = router;
