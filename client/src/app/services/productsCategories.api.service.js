import httpApi from './api.http.service';

async function getCategories() {
	const { data } = await httpApi.get('/productCategory');
	return data;
}

const productsCategoriesService = {
	getCategories,
};

export default productsCategoriesService;
