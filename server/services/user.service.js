const User = require('../model/User');

class UserService {
	async create(data) {
		return await User.create(data);
	}

	async find(queryParams) {
		return await User.findOne(queryParams);
	}

	async isAdmin(userId) {
		try {
			return await !!User.findById(userId);
		} catch (err) {
			return null;
		}
	}
}

const userService = new UserService();

module.exports = userService;
