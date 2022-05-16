const userService = require('../../services/user.service');
const ErrorResponse = require('../helpers/ErrorResponse');

const useAdminAuthMiddleware = () => async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const isAdmin = await userService.isAdmin(req.token.userId);

		if (!isAdmin) {
			throw new Error('Admin privileges required');
		}

		next();
	} catch (err) {
		const errResponse = new ErrorResponse(403, err.message);
		res.status(403).json(errResponse);
	}
};

module.exports = useAdminAuthMiddleware;
