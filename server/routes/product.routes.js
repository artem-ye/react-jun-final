const express = require('express');
const { isValidObjectId } = require('mongoose');
const Product = require('../model/Product');
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

module.exports = router;
