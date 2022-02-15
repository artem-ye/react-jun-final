const authService = require('../../services/auth.service');
const ErrorResponse = require('../helpers/ErrorResponse');

const useAuthMiddleware = () => async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers?.authorization?.split(' ')[1];
		if (!token) {
			throw new Error('Authorization required');
		}
		const validationRes = await authService.validateAccessToken(token);
		if (!validationRes) {
			throw new Error('Invalid token');
		}

		req.token = {
			token,
			...validationRes,
		};
		next();
	} catch (err) {
		const errResponse = new ErrorResponse(401, err.message);
		res.status(401).json(errResponse);
	}
};

module.exports = useAuthMiddleware;
