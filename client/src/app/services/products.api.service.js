import httpApi from './api.http.service';

async function getProducts() {
	const { data } = await httpApi.get('/productCategory');
	return data;
}

const productsService = {
	getProducts,
};

export default productsService;
