import { ValueValidator } from './ValueValidator';
import * as VALIDATOR_HANDLERS from './valueValidatorHandlers';

class ValidatorsChain {
	#fieldName = '';
	#validators = [];

	constructor(field) {
		this.#fieldName = field;
	}

	[Symbol.iterator]() {
		return this.#validators.values();
	}

	get fieldName() {
		return this.#fieldName;
	}

	isEmail(message = '') {
		return this.#chainValidator(VALIDATOR_HANDLERS.isEmail, message);
	}

	isNotEmptyString(message = '') {
		return this.#chainValidator(VALIDATOR_HANDLERS.isNotEmptyString, message);
	}

	isCount(message = '') {
		return this.#chainValidator(VALIDATOR_HANDLERS.isCount, message);
	}

	#chainValidator(validatorHandler, message) {
		const valueValidator = new ValueValidator(this.#fieldName, message, validatorHandler);
		this.#validators.push(valueValidator);
		return this;
	}
}

export { ValidatorsChain };
