const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		sku: { type: String, required: true },
		title: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number },
		category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Product', schema);
