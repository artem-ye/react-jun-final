const bcrypt = require('bcryptjs');

const tokenService = require('./token.service');
const userService = require('./user.service');

class AuthService {
	#credentialValidationError = null;

	async issueTokens(userId) {
		const tokensPair = tokenService.issueTokenPair({ userId });
		await tokenService.update(userId, tokensPair.refreshToken);
		return { ...tokensPair, userId };
	}

	async registerNewUser({ email, password, ...rest }) {
		const passHash = await bcrypt.hash(password, 12);

		const dbUser = await userService.create({
			email,
			...rest,
			password: passHash,
		});

		return dbUser;
	}

	async validateUserCredentials(email, password) {
		this.#credentialValidationError = null;

		const dbUser = await this.#findUserByEmail(email);
		if (!dbUser) {
			this.#credentialValidationError = new Error('User not exists');
			return null;
		}

		const isPasswordMatch = bcrypt.compareSync(password, dbUser.password);
		if (!isPasswordMatch) {
			this.#credentialValidationError = Error('Wrong password');
			return null;
		}

		return dbUser;
	}

	async validateRefreshToken(token) {
		const verifyRes = tokenService.validateRefreshToken(token);

		if (!verifyRes) {
			return null;
		}

		const dbToken = await tokenService.findToken(token);
		return dbToken;
	}

	async validateAccessToken(token) {
		const validationRes = tokenService.validateRefreshToken(token);
		return validationRes;
	}

	async isUserExists(email) {
		return !!(await this.#findUserByEmail(email));
	}

	async #findUserByEmail(email) {
		return await userService.find({ email });
	}
}

const authService = new AuthService();

module.exports = authService;
