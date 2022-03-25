import authReducer from './reducers/user.reducer';
import productsCategoriesReducer from './reducers/productsCategories.reducer';
import productsReducer from './reducers/products.reducer';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
	auth: authReducer,
	productsCategories: productsCategoriesReducer,
	products: productsReducer,
});

function createSore() {
	return configureStore({
		reducer: rootReducer,
	});
}

export default createSore;
