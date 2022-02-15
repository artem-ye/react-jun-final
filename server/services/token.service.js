const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../model/Token');

const JWT_SECRET = config.get('jwtSecret');
const JWT_REFRESH_SECRET = config.get('jwtRefreshSecret');

class TokenService {
	refreshTokenValidationError = null;
	accessTokenValidationError = null;

	constructor(jwtSecret, jwtRefreshSecret) {
		this.JWT_SECRET = jwtSecret;
		this.JWT_REFRESH_SECRET = jwtRefreshSecret;
	}

	issueTokenPair(payload) {
		const accessToken = jwt.sign(payload, this.JWT_SECRET, {
			expiresIn: '1h',
		});

		const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET);

		return {
			accessToken,
			refreshToken,
			expiresIn: 3600,
		};
	}

	validateRefreshToken(refreshToken) {
		let verifyRes;
		this.refreshTokenValidationError = null;

		try {
			verifyRes = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET);
		} catch (err) {
			this.refreshTokenValidationError = err;
			return null;
		}

		return verifyRes;
	}

	validateAccessToken(accessToken) {
		let verifyRes;
		this.accessTokenValidationError = null;

		try {
			verifyRes = jwt.verify(accessToken, this.JWT_SECRET);
		} catch (err) {
			this.accessTokenValidationError = err;
			return null;
		}

		return verifyRes;
	}

	async update(userId, refreshToken) {
		const dbToken = await Token.findOne({ userId });
		if (dbToken) {
			dbToken.refreshToken = refreshToken;
			return dbToken.save();
		}

		const token = await Token.create({
			userId,
			refreshToken,
		});

		return token;
	}

	async findToken(refreshToken) {
		return await Token.findOne({ refreshToken });
	}
}

const tokenService = new TokenService(JWT_SECRET, JWT_REFRESH_SECRET);

module.exports = tokenService;
