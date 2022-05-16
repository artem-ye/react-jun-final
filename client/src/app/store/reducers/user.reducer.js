import { createSlice } from '@reduxjs/toolkit';
import authController from '../../controllers/auth.controller';
import userService from '../../services/user.api.service';

const INITIAL_STATE = {
	isLoading: false,
	loginError: null,
	isLoggedIn: false,

	signUpError: null,

	isProfileLoaded: false,
	isProfileLoading: false,
	loadProfileError: null,
	profile: {},
};

if (authController.isLoggedIn()) {
	INITIAL_STATE.isLoggedIn = true;
	INITIAL_STATE.isLoading = false;
}

const authSlice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers: {
		logInRequested: (state) => {
			state.isLoading = true;
			state.loginError = null;
		},
		logInSuccess: (state, action) => {
			state.isLoading = false;
			state.isLoggedIn = true;

			if (state.isProfileLoaded) {
				state.profile = {};
				state.isProfileLoaded = false;
			}
		},
		logInFailed: (state, action) => {
			state.isLoading = false;
			state.loginError = action.payload;
		},

		singUpRequested: (state) => {
			state.signUpError = null;
		},
		signUpSuccess: (state, action) => {
			state.isLoading = false;
			state.isLoggedIn = true;

			if (state.isProfileLoaded) {
				state.profile = {};
				state.isProfileLoaded = false;
			}
		},
		signUpFailed: (state, action) => {
			state.isLoading = false;
			state.signUpError = action.payload;
		},

		logOutSuccess: (state) => {
			state.isLoggedIn = false;
			state.profile = {};
			state.isProfileLoaded = false;
		},

		loadProfileRequested: (state) => {
			state.isProfileLoading = true;
			state.loadProfileError = undefined;
		},
		loadProfileSuccess: (state, action) => {
			state.isProfileLoading = false;
			state.isProfileLoaded = true;
			state.profile = action.payload;
		},
		loadProfileFailed: (state, action) => {
			state.isProfileLoading = false;
			state.isProfileLoaded = true;
			state.loadProfileError = action.payload;
		},
	},
});

const { reducer: authReducer, actions } = authSlice;

const logIn = (userData) => async (dispatch) => {
	const { email, password } = userData;
	dispatch(actions.logInRequested());

	try {
		await authController.logIn({ email, password });
		dispatch(actions.logInSuccess());
		return true;
	} catch (err) {
		dispatch(actions.logInFailed(err?.message || 'UNEXPECTED ERROR'));
		return false;
	}
};

const logOut = () => (dispatch) => {
	try {
		authController.logOut();
		dispatch(actions.logOutSuccess());
	} catch (err) {}
};

const signUp = (useData) => async (dispatch) => {
	dispatch(actions.singUpRequested());
	dispatch(actions.signUpSuccess());
};

const loadProfile = async (dispatch) => {
	dispatch(actions.loadProfileRequested());

	try {
		const profile = await userService.getProfile();
		dispatch(actions.loadProfileSuccess(profile));
	} catch (err) {
		dispatch(actions.loadProfileFailed(err?.message));
	}
};

const getLoginError = (state) => state.auth.error;
const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getIsLoading = (state) => state.auth.isLoading;

const getIsProfileLoaded = (state) => state.auth.isProfileLoaded;
const getProfile = (state) => state.auth.profile;
const getIsProfileLoading = (state) => state.auth.isProfileLoading;
const getLoadProfileError = (state) => state.auth.loadProfileError;
const getIsAdminProfile = (state) => state.auth.profile.isAdmin;

const getSignUpError = (state) => state.auth.signUpError;

export {
	signUp,
	logIn,
	logOut,
	loadProfile,
	getLoginError,
	getIsLoading,
	getIsLoggedIn,
	getIsProfileLoaded,
	getProfile,
	getIsAdminProfile,
	getIsProfileLoading,
	getLoadProfileError,
	getSignUpError,
};

export default authReducer;
