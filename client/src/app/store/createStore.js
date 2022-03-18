import productsCategoriesReducer from './reducers/productsCategories.reducer';
import authReducer from './reducers/user.reducer';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
	auth: authReducer,
	productsCategories: productsCategoriesReducer,
});

function createSore() {
	return configureStore({
		reducer: rootReducer,
	});
}

export default createSore;
