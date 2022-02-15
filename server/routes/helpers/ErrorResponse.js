class ErrorResponse {
	constructor(code, message, errors = []) {
		this.code = code || 400;
		this.message = message || 'ERROR';
		this.errors = errors;
	}

	get body() {
		return {
			error: {
				code: this.code,
				message: this.message,
				errors: this.errors,
			},
		};
	}

	send(response) {
		response.status(this.code).json(this.body);
	}
}

module.exports = ErrorResponse;
