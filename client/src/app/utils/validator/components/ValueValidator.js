class ValueValidator {
	constructor(field, message = '', handler, options = {}) {
		this.field = field;
		this.options = options;
		this.message = message;
		this.validatorHandler = handler;
	}

	_validate(value, options) {
		return this.validatorHandler(value, options);
	}

	validate(value) {
		if (!this._validate(value, this.options)) {
			return { message: this.message };
		}
		return null;
	}
}

export { ValueValidator };
