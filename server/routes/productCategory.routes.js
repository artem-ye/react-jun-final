const express = require('express');
const ProductCategory = require('../model/ProductCategory');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const result = await ProductCategory.find();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: `DB error: ${err.message}` });
	}
});

module.exports = router;
