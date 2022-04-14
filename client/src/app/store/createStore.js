import authReducer from './reducers/user.reducer';
import productsCategoriesReducer from './reducers/productsCategories.reducer';
import productsReducer from './reducers/products.reducer';
import searchBarReducer from './reducers/searchBar.reducer';
import cartReducer from './reducers/cart.reducer';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
	searchBar: searchBarReducer,
	auth: authReducer,
	productsCategories: productsCategoriesReducer,
	products: productsReducer,
	cart: cartReducer,
});

function createSore() {
	return configureStore({
		reducer: rootReducer,
	});
}

export default createSore;
