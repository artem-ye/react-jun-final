import httpApi from './api.http.service';

async function getProducts() {
	const { data } = await httpApi.get('/product');
	return data;
}

async function updateProduct(data) {
	const result = await httpApi.patch(`/product/${data._id}`, data);
	return result.data;
}

async function deleteProduct(data) {
	const result = await httpApi.delete(`/product/${data._id}`);
	return result.data;
}

async function createProduct(data) {
	const result = await httpApi.post(`/product`, data);
	return result.data;
}

const productsService = {
	getProducts,
	updateProduct,
	deleteProduct,
	createProduct,
};

export default productsService;
