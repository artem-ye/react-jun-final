import authReducer from './reducers/user.reducer';
import productsCategoriesReducer from './reducers/productsCategories.reducer';
import productsReducer from './reducers/products.reducer';
import searchBarReducer from './reducers/searchBar.reducer';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
	auth: authReducer,
	productsCategories: productsCategoriesReducer,
	products: productsReducer,
	searchBar: searchBarReducer,
});

function createSore() {
	return configureStore({
		reducer: rootReducer,
	});
}

export default createSore;
