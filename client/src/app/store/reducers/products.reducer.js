import { createSlice } from '@reduxjs/toolkit';
import productsService from '../../services/products.api.service';

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

	try {
		const products = await productsService.getProducts();
		dispatch(actions.loadProductsSuccess(products));
	} catch (err) {
		dispatch(actions.loadProductsFailed(err));
	}
};

const getProducts = () => (state) => state.products.entities;
const getProductsByCategory = (categoryId) => (state) => {
	return state.products.entities.filter((product) => product.category === categoryId);
};

export { getProducts, getProductsByCategory, loadProducts };

export default productsReducer;
