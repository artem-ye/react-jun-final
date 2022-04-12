import httpApi from './api.http.service';

async function getProfile() {
	const { data } = await httpApi.get('/user');
	return data;
}

const userService = {
	getProfile,
};

export default userService;
