const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USER_ID_KEY = 'user-id';

export function setTokens({ accessToken, refreshToken, userId, expiresIn = 3600 }) {
	const expiresDate = new Date().getTime() + expiresIn * 1000;
	localStorage.setItem(USER_ID_KEY, userId);
	localStorage.setItem(TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getTokens() {
	const userId = localStorage.getItem(USER_ID_KEY);
	const accessToken = localStorage.getItem(TOKEN_KEY);
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
	const expiresDate = localStorage.getItem(EXPIRES_KEY);

	if (!accessToken || !refreshToken) {
		return null;
	}

	return { accessToken, refreshToken, userId, expiresDate };
}

export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getExpiresTokenDate() {
	return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
	return localStorage.getItem(USER_ID_KEY);
}

export function removeAuthData() {
	localStorage.removeItem(USER_ID_KEY);
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
	setTokens,
	getAccessToken,
	getRefreshToken,
	getExpiresTokenDate,
	getUserId,
	removeAuthData,
	getTokens,
};

export default localStorageService;
