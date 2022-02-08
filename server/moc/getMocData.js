const mocData = require('./suppliers_products.json');

function getMocData() {
	const mocSlice = mocData.find((e) => e.supplier === 'Дорогие кольца Yiwu');
	const { productsCategories, products } = parseMocSlice(mocSlice);
	return { productsCategories, products };
}

function parseMocSlice(data) {
	const categoriesSet = new Set();
	const products = [];

	data.products.forEach((product) => {
		const [sku, category] = product.title.split('/');
		const newProduct = {
			sku,
			category,
			title: category,
			image: `http://img.nothingshop.com/images/${sku}/preview.jpg`,
			price: Number(sku.substr(-1, 1)) || 1,
		};
		products.push(newProduct);
		categoriesSet.add(category);
	});

	const productsCategories = Array.from(categoriesSet).map((title) => {
		return { title };
	});

	return {
		productsCategories: productsCategories,
		products: products,
	};
}

module.exports = getMocData;
