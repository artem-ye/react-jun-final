const ErrorResponse = require('./ErrorResponse');

class ValidationErrorResponse extends ErrorResponse {
	constructor(error) {
		const errorsArray = error.array().map((el) => {
			const newError = { ...el };
			delete newError.location;
			return newError;
		});

		super(400, 'VALIDATION_ERROR', errorsArray);
	}
}

module.exports = ValidationErrorResponse;
