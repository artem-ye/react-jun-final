import { createSlice } from '@reduxjs/toolkit';
import productsService from '../../services/products.api.service';

const INITIAL_STATE = {
	isLoaded: false,
	isLoading: false,
	error: null,

	isUpdating: false,
	updateError: null,

	isDeleting: false,
	deleteError: null,

	isCreating: false,
	createError: null,

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
		// Update
		updateProductRequested: (state) => {
			state.isUpdating = true;
			state.updateError = null;
		},
		updateProductSuccess: (state, action) => {
			state.isUpdating = false;

			const updatedData = action.payload;
			const entities = state.entities;
			const index = entities.findIndex((product) => product._id === updatedData._id);

			if (index >= 0) {
				entities[index] = { ...updatedData };
			}
		},
		updateProductFailed: (state, action) => {
			state.isUpdating = false;
			state.updateError = action.payload;
		},
		// Delete
		deleteProductRequested: (state) => {
			state.isDeleting = true;
			state.deleteError = null;
		},
		deleteProductSuccess: (state, action) => {
			state.isDeleting = false;

			const { _id } = action.payload;
			state.entities = state.entities.filter((product) => product._id !== _id);
		},
		deleteProductFailed: (state, action) => {
			state.isDeleting = false;
			state.deleteError = action.payload;
		},
		// Create
		createProductRequested: (state) => {
			state.isCreating = true;
			state.createError = null;
		},
		createProductSuccess: (state, action) => {
			state.isCreating = false;
			state.entities.unshift(action.payload);
		},
		createProductFailed: (state, action) => {
			state.isCreating = false;
			state.createError = action.payload;
		},
	},
});

const { reducer: productsReducer, actions } = productsCategoriesSlice;

///////////////////////////////////////////////////////////////////////////////
// Actions
///////////////////////////////////////////////////////////////////////////////

const loadProducts = () => async (dispatch) => {
	dispatch(actions.loadProductsRequested());

	try {
		const products = await productsService.getProducts();
		dispatch(actions.loadProductsSuccess(products));
	} catch (err) {
		const errPayload = normalizeError(err);
		dispatch(actions.loadProductsFailed(errPayload));
	}
};

const updateProduct = (data) => async (dispatch) => {
	dispatch(actions.updateProductRequested());

	try {
		const result = await productsService.updateProduct(data);
		dispatch(actions.updateProductSuccess(result));
	} catch (err) {
		const errPayload = normalizeError(err);
		dispatch(actions.updateProductFailed(errPayload));
	}
};

const deleteProduct = (data) => async (dispatch) => {
	dispatch(actions.deleteProductRequested());

	try {
		const result = await productsService.deleteProduct(data);
		dispatch(actions.deleteProductSuccess(result));
	} catch (err) {
		const errPayload = normalizeError(err);
		dispatch(actions.deleteProductFailed(errPayload));
	}
};

const createProduct = (data) => async (dispatch) => {
	dispatch(actions.createProductRequested);

	const normalizedData = { ...data };
	if ('_id' in normalizedData) {
		delete normalizedData._id;
	}

	try {
		const result = await productsService.createProduct(normalizedData);
		dispatch(actions.createProductSuccess(result));
	} catch (err) {
		const errPayload = normalizeError(err);
		dispatch(actions.createProductFailed(errPayload));
	}
};

///////////////////////////////////////////////////////////////////////////////
// Helpers
///////////////////////////////////////////////////////////////////////////////

function normalizeError(error) {
	if (!error) {
		return;
	}

	return error?.response?.data || error;
}

///////////////////////////////////////////////////////////////////////////////
// Selectors
///////////////////////////////////////////////////////////////////////////////

const getProducts = () => (state) => state.products.entities;
const getProductsByCategory = (categoryId) => (state) => {
	return state.products.entities.filter((product) => product.category === categoryId);
};
const getProductById = (productId) => (state) => {
	return state.products.entities.find((product) => product._id === productId);
};

const getIsProductsLoaded = () => (state) => {
	return state.products.isLoaded;
};

const getIsProductsLoading = () => (state) => {
	return state.products.isLoading;
};

const getProductsUpdateError = () => (state) => {
	return state.products.updateError;
};

const getProductsDeleteError = () => (state) => {
	return state.products.deleteError;
};

// Create
const getProductsCreateError = () => (state) => {
	return state.products.createError;
};

const getIsProductsCreating = () => (state) => {
	return state.products.isCreating;
};

export {
	getProducts,
	getProductsByCategory,
	getProductById,
	getIsProductsLoaded,
	getIsProductsLoading,
	loadProducts,
	updateProduct,
	getProductsUpdateError,
	deleteProduct,
	getProductsDeleteError,
	// create
	createProduct,
	getProductsCreateError,
	getIsProductsCreating,
};

export default productsReducer;
