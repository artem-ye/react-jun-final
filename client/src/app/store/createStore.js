// import authReducer from './reducers/auth.reducer';

import authReducer from './reducers/user.reducer';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

// import commentsReducer from './comments';
// import professionsReducer from './professions';
// import qualitiesReducer from './qualities';
// import usersReducer from './users';

const rootReducer = combineReducers({
	auth: authReducer,
	// qualities: qualitiesReducer,
	// professions: professionsReducer,
	// users: usersReducer,
	// comments: commentsReducer,
});

function createSore() {
	return configureStore({
		reducer: rootReducer,
	});
}

export default createSore;
