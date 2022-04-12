import axios from 'axios';
import authController from '../controllers/auth.controller';

const baseUrl = () => {
	const url = process.env.REACT_APP_API_BASE_URL;

	if (!url) {
		throw new Error('ERROR api.http.service process.env.REACT_APP_API_BASE_URL not set!');
	}

	return url;
};

const http = axios.create({
	baseURL: baseUrl(),
});

http.interceptors.request.use(async (config) => {
	if (authController.isTokenExpired()) {
		try {
			await authController.refreshAccessToken();
		} catch (err) {
			console.log('Fuck', err);
		}
	}

	const accessToken = authController.getAccessToken();
	if (accessToken) {
		config.headers['Authorization'] = 'Bearer ' + accessToken;
	}

	return { ...config };
});

const httpApi = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};

export default httpApi;
