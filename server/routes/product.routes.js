const express = require('express');
const { isValidObjectId } = require('mongoose');
const Product = require('../model/Product');
const userService = require('../services/user.service');
const ErrorResponse = require('./helpers/ErrorResponse');
const useAuthMiddleware = require('./middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const result = await Product.find();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: `DB error: ${err.message}` });
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	if (!isValidObjectId(id)) {
		res.status(200).json(null);
		return;
	}

	try {
		const result = await Product.findById(req.params.id);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: `DB error: ${err.message}` });
	}
});

router.patch('/:id', useAuthMiddleware(), async (req, res) => {
	try {
		if (!(await userService.isAdmin(req.token.userId))) {
			throw new Error('FORBIDDEN');
		}
	} catch (err) {
		const errResponse = new ErrorResponse(403, 'FORBIDDEN');
		return res.status(403).json(errResponse);
	}

	const { _id, ...productData } = req.body;
	if (!_id || !productData) {
		const errResponse = new ErrorResponse(400, 'BAD_REQUEST');
		return res.status(400).json(errResponse);
	}

	try {
		const res = await Product.findByIdAndUpdate(_id, productData, { new: true });
		res.send(200).json(res);
	} catch {
		const errResponse = new ErrorResponse(500, 'SERVER_ERROR');
		return res.status(400).json(errResponse);
	}
});

router.post('/', useAuthMiddleware(), async (req, res) => {
	try {
		if (!(await userService.isAdmin(req.token.userId))) {
			throw new Error('FORBIDDEN');
		}
	} catch (err) {
		const errResponse = new ErrorResponse(403, 'FORBIDDEN');
		return res.status(403).json(errResponse);
	}

	const { ...productData } = req.body;
	if (!productData) {
		const errResponse = new ErrorResponse(400, 'BAD_REQUEST');
		return res.status(400).json(errResponse);
	}

	try {
		const res = await Product.create(productData);
		res.send(201).json(res);
	} catch {
		const errResponse = new ErrorResponse(500, 'SERVER_ERROR');
		return res.status(400).json(errResponse);
	}
});

module.exports = router;
