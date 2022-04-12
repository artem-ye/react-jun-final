import axios from 'axios';

const BASE_URL = process.env.REACT_APP_AUTH_API_BASE_URL;
if (!BASE_URL) {
	throw new Error('process.env.REACT_APP_AUTH_API_BASE_URL not set');
}

const httpAuth = axios.create({
	baseURL: BASE_URL,
});

const authService = {
	register: async ({ email, password, ...rest }) => {
		const { data } = await httpAuth.post('/signUp', { email, password, ...rest });
		return data;
	},

	logIn: async ({ email, password }) => {
		const { data } = await httpAuth.post('/signInWithPassword', { email, password });
		return data;
	},

	refreshToken: async (refreshToken) => {
		const { data } = await httpAuth.post('/refreshToken', { refreshToken: refreshToken });
		return data;
	},
};

export { authService };
