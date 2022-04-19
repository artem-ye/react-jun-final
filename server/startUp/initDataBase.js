const chalk = require('chalk');
const getMocData = require('../moc/getMocData');
const Product = require('../model/Product');
const ProductCategory = require('../model/ProductCategory');

async function initDataBase() {
	const { products: productsMoc, productsCategories: productsCategoriesMoc } = getMocData();

	let productsCategories = await ProductCategory.find();
	if (productsCategories.length === 0) {
		console.log(chalk.red('Initializing products table'));
		await createInitialEntries(ProductCategory, productsCategoriesMoc);
		productsCategories = await ProductCategory.find();
	}

	if ((await Product.find()) < productsMoc.length) {
		console.log(chalk.red('Initializing products table'));
		const productsMocWithCategories = productsMoc.map((product) => {
			const dbCategory = productsCategories.find((el) => el.title === product.category);
			return {
				...product,
				category: dbCategory._id,
			};
		});
		await createInitialEntries(Product, productsMocWithCategories);
	}
}

async function createInitialEntries(Model, data) {
	await Model.collection.drop();

	return Promise.all(
		data.map(async (item) => {
			try {
				const newItem = new Model(item);
				await newItem.save();
			} catch (error) {
				return error;
			}
		})
	);
}

module.exports = initDataBase;
