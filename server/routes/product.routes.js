const express = require('express');
const { isValidObjectId } = require('mongoose');
const Product = require('../model/Product');
const ErrorResponse = require('./helpers/ErrorResponse');
const useAdminAuthMiddleware = require('./middleware/adminAuth.middleware');
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

router.patch('/:id', useAuthMiddleware(), useAdminAuthMiddleware(), async (req, res) => {
	const productId = req.params.id;
	const productData = { ...req.body };

	if (!productId || !productData) {
		const errResponse = new ErrorResponse(400, 'BAD_REQUEST');
		return res.status(400).json(errResponse);
	}

	if ('_id' in productData) {
		delete productData._id;
	}

	try {
		const result = await Product.findByIdAndUpdate(productId, productData, { new: true });
		return res.status(200).json(result);
	} catch (err) {
		const errResponse = new ErrorResponse(500, 'SERVER_ERROR', [err.message]);
		return res.status(400).json(errResponse);
	}
});

router.delete('/:id', useAuthMiddleware(), useAdminAuthMiddleware(), async (req, res) => {
	const productId = req.params.id;

	if (!productId) {
		const errResponse = new ErrorResponse(400, 'BAD_REQUEST');
		return res.status(400).json(errResponse);
	}

	try {
		const result = await Product.findByIdAndDelete(productId);
		return res.status(200).json(result);
	} catch (err) {
		const errResponse = new ErrorResponse(500, 'SERVER_ERROR', [err.message]);
		return res.status(400).json(errResponse);
	}
});

router.post('/', useAuthMiddleware(), useAdminAuthMiddleware(), async (req, res) => {
	const { ...productData } = req.body;
	if (!productData) {
		const errResponse = new ErrorResponse(400, 'BAD_REQUEST');
		return res.status(400).json(errResponse);
	}

	try {
		const result = await Product.create(productData);
		return res.status(201).json(result);
	} catch (err) {
		const errResponse = new ErrorResponse(500, 'SERVER_ERROR', [err.message]);
		return res.status(400).json(errResponse);
	}
});

module.exports = router;
