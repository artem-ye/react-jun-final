const express = require('express');
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require('express-validator');

const ErrorResponse = require('./helpers/ErrorResponse');
const ValidationErrorResponse = require('./helpers/ValidationErrorResponse');
const authService = require('../services/auth.service');

const validationChecks = {
	signUp: [
		check('email', "'email' validation failed: invalid address").isEmail(),
		check('password', "'password' validation failed: min length 6'").exists().isLength({ Min: 6 }),
		check('name', "'name' validation failed: required").exists(),
		check('image', "'image' validation failed: required").exists(),
	],
	signInWithPassword: [
		check('email', "'email' validation failed: invalid address").exists(),
		// check('email').custom((email) => {
		// 	return new Promise((resolve, reject) => {
		// 		authService.isUserExists('test1@test.ua').then((isUserExists) => {
		// 			console.log('Check res', isUserExists, email);

		// 			if (isUserExists) {
		// 				reject('Exists');
		// 			} else {
		// 				resolve();
		// 			}
		// 		});
		// 	});
		// }),
		check('password', "'password' validation failed: required'").exists(),
	],
	refreshToken: [check('refreshToken', "'refreshToken' required").exists()],
};

router.post('/signUp', [
	[...validationChecks.signUp],
	async (req, res) => {
		try {
			try {
				validationResult(req).throw();
			} catch (err) {
				const errResponse = new ValidationErrorResponse(err);
				return res.status(400).json(errResponse.body);
			}

			if (await authService.isUserExists(req.body.email)) {
				const errResponse = new ErrorResponse(400, 'USER_EXISTS', [{ message: 'User exists' }]);
				return res.status(400).json(errResponse.body);
			}

			const newUser = await authService.registerNewUser(req.body);
			const tokens = await authService.issueTokens(newUser._id);
			res.status(201).json(tokens);
		} catch (err) {
			const errResponse = new ErrorResponse(500, 'INTERNAL_ERROR', [{ message: err.message }]);
			res.status(500).json(errResponse.body);
			throw err;
		}
	},
]);

router.post('/signInWithPassword', [
	[...validationChecks.signInWithPassword],
	async (req, res) => {
		try {
			try {
				validationResult(req).throw();
			} catch (err) {
				const response = new ValidationErrorResponse(err);
				return res.status(400).json(response.body);
			}

			const { email, password } = req.body;

			const dbUser = await authService.validateUserCredentials(email, password);
			if (!dbUser) {
				const errResponse = new ErrorResponse(401, 'AUTH_ERROR');
				return res.status(401).json(errResponse.body);
			}

			const tokens = await authService.issueTokens(dbUser._id);
			res.status(200).json(tokens);
		} catch (err) {
			const errResponse = new ErrorResponse(500, 'INTERNAL_ERROR', [{ message: err.message }]);
			res.status(500).json(errResponse.body);
			throw err;
		}
	},
]);

router.post('/refreshToken', [
	[...validationChecks.refreshToken],
	async (req, res) => {
		const { refreshToken } = req.body;

		const dbToken = await authService.validateRefreshToken(refreshToken);
		if (!dbToken) {
			const errResponse = new ErrorResponse(401, 'AUTH_ERROR');
			return res.status(401).json(errResponse.body);
		}

		const tokens = await authService.issueTokens(dbToken.userId);
		res.status(200).json(tokens);
	},
]);

module.exports = router;
