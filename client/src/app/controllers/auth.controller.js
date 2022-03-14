import { authService } from '../services/auth.api.service';
import localStorageService from '../services/localStorage.service';

const ERROR_STATUS = {
	LOGIN_FAILED: 'LOGIN_FAILED',
	SIGNUP_FAILED: 'SIGNUP_FAILED',
	UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
};

async function logIn({ email, password }) {
	try {
		const { accessToken, refreshToken, expiresIn, userId } = await authService.logIn({ email, password });
		localStorageService.setTokens({ accessToken, refreshToken, expiresIn, userId });
		return { accessToken, refreshToken, expiresIn, userId };
	} catch (err) {
		const { status, statusText } = normalizeApiError(err);
		const error = new Error(statusText);
		error.status = status === 401 ? ERROR_STATUS.LOGIN_FAILED : ERROR_STATUS.UNEXPECTED_ERROR;
		throw Error(error);
	}
}

async function signUp({ email, password, ...rest }) {
	try {
		const { accessToken, refreshToken, expiresIn, userId } = await authService.register({
			email,
			password,
			...rest,
		});
		localStorageService.setTokens({ accessToken, refreshToken, expiresIn, userId });
		return { accessToken, refreshToken, expiresIn, userId };
	} catch (err) {
		const { status, statusText } = normalizeApiError(err);
		const error = new Error(statusText);
		error.status = status === 401 ? ERROR_STATUS.SIGNUP_FAILED : ERROR_STATUS.UNEXPECTED_ERROR;
		throw Error(error);
	}
}

async function refreshToken() {
	const _refreshToken = localStorageService.getRefreshToken();
	const { accessToken, refreshToken, expiresIn, userId } = await authService.refreshToken(_refreshToken);
	localStorageService.setTokens({ accessToken, refreshToken, expiresIn, userId });
	return { accessToken, refreshToken, expiresIn, userId };
}

function isTokenExpired() {
	const refreshToken = localStorageService.getRefreshToken();
	const expiresDate = localStorageService.getExpiresTokenDate();
	return refreshToken && expiresDate < Date.now();
}

function logOut() {
	localStorageService.removeAuthData();
}

function normalizeApiError(err) {
	const { status, statusText } = err?.response || {
		status: 1,
		statusText: err?.message || 'ERROR: ' + err,
	};

	return { status, statusText };
}

const authController = {
	isLoggedIn() {
		return !!localStorageService.getAccessToken();
	},
	getAccessToken() {
		return localStorageService.getAccessToken();
	},
	signUp,
	logIn,
	refreshAccessToken: refreshToken,
	isTokenExpired,
	logOut,
};

export default authController;
