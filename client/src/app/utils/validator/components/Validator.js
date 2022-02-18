class Validator {
	#validatorsChainsArray = [];

	constructor(validatorsChainsArray) {
		this.#validatorsChainsArray = validatorsChainsArray;
	}

	validate(targetObject) {
		const normalizedObject = targetObject || {};
		const validationErrors = {};

		for (const validatorsChain of this.#validatorsChainsArray) {
			const targetFiled = validatorsChain.fieldName;
			const targetValue = normalizedObject[targetFiled];
			let errors = [];

			for (const validator of validatorsChain) {
				const error = validator.validate(targetValue);
				if (error) {
					errors.push(error.message);
				}
			}

			if (errors.length === 0) {
				continue;
			}

			if (targetFiled in validationErrors) {
				errors = [...validationErrors[targetFiled], ...errors];
			}

			validationErrors[targetFiled] = errors;
		}

		return validationErrors;
	}
}

export { Validator };
