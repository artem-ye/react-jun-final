import { createSlice } from '@reduxjs/toolkit';
import productsCategoriesService from '../../services/productsCategories.api.service';

const INITIAL_STATE = {
	isLoaded: false,
	isLoading: false,
	error: null,
	lastFetchDate: 0,
	entities: [],
};

const productsCategoriesSlice = createSlice({
	name: 'productsCategories',
	initialState: INITIAL_STATE,
	reducers: {
		loadProductsCategoriesRequested: (state) => {
			state.isLoading = true;
			state.error = false;
		},
		loadProductsCategoriesSuccess: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.isLoaded = true;
		},
		loadProductsCategoriesFailed: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

const { reducer: productsCategoriesReducer, actions } = productsCategoriesSlice;

const loadProductsCategories = () => async (dispatch) => {
	dispatch(actions.loadProductsCategoriesRequested());

	try {
		const categories = await productsCategoriesService.getCategories();
		const sotredCategories = categories.sort((a, b) => (a.title > b.title ? 1 : -1));
		dispatch(actions.loadProductsCategoriesSuccess(sotredCategories));
	} catch (err) {
		dispatch(actions.loadProductsCategoriesFailed(err));
	}
};

const getProductsCategories = (state) => state.productsCategories.entities;

export { getProductsCategories, loadProductsCategories };

export default productsCategoriesReducer;
