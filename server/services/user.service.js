const User = require('../model/User');

class UserService {
	async create(data) {
		return await User.create({ ...data, isAdmin: false });
	}

	async find(queryParams) {
		return await User.findOne(queryParams);
	}

	async findById(id) {
		return await User.findById(id);
	}

	async isAdmin(userId) {
		try {
			return (await User.findById(userId))?.isAdmin;
		} catch (err) {
			return null;
		}
	}
}

const userService = new UserService();

module.exports = userService;
