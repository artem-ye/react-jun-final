import { createSlice } from '@reduxjs/toolkit';
import productsService from '../../services/products.api.service';
// import productsCategoriesService from '../../services/productsCategories.api.service';

const INITIAL_STATE = {
	isLoaded: false,
	isLoading: false,
	error: null,
	lastFetchDate: 0,
	entities: [],
};

const productsCategoriesSlice = createSlice({
	name: 'products',
	initialState: INITIAL_STATE,
	reducers: {
		loadProductsRequested: (state) => {
			state.isLoading = true;
			state.error = false;
		},
		loadProductsSuccess: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.isLoaded = true;
		},
		loadProductsFailed: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

const { reducer: productsReducer, actions } = productsCategoriesSlice;

const loadProducts = () => async (dispatch) => {
	dispatch(actions.loadProductsRequested());

	const products = await productsService.getProducts();

	// const products = [
	// 	{
	// 		_id: '62013eb6953086c62b896afa',
	// 		sku: '97903',
	// 		title: 'Кольцо',
	// 		image: 'http://img.nothingshop.com/images/97903/preview.jpg',
	// 		price: 3,
	// 		category: '62013b9b272189ab7438d14d',
	// 		createdAt: '2022-02-07T15:45:58.746Z',
	// 		updatedAt: '2022-02-07T15:45:58.746Z',
	// 		__v: 0,
	// 	},
	// 	{
	// 		_id: '62013eb6953086c62b896afb',
	// 		sku: '97872',
	// 		title: 'Кольцо',
	// 		image: 'http://img.nothingshop.com/images/97872/preview.jpg',
	// 		price: 2,
	// 		category: '62013b9b272189ab7438d14d',
	// 		createdAt: '2022-02-07T15:45:58.746Z',
	// 		updatedAt: '2022-02-07T15:45:58.746Z',
	// 		__v: 0,
	// 	},
	// ];
	dispatch(actions.loadProductsSuccess(products));

	// try {
	// 	const categories = await productsCategoriesService.getCategories();
	// 	const sotredCategories = categories.sort((a, b) => (a.title > b.title ? 1 : -1));
	// 	dispatch(actions.loadProductsCategoriesSuccess(sotredCategories));
	// } catch (err) {
	// 	dispatch(actions.loadProductsCategoriesFailed(err));
	// }
};

const getProducts = () => (state) => state.products.entities;
const getProductsByCategory = (categoryId) => (state) => {
	return state.products.entities.filter((product) => product.category === categoryId);
};

export { getProducts, getProductsByCategory, loadProducts };

export default productsReducer;
