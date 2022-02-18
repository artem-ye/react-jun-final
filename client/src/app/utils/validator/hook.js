import { Validator } from './components/Validator';
import { ValidatorsChain } from './components/ValidatorsChain';

//
// Usage example:
//

// 	const validate = useValidator(
// 		check('email').isEmail('Wrong email').isNotEmpty('Cant be empty'),
// 		check('password').isNotEmpty('Cant be empty')
// 	);
// 	const res = validate({ email: 'fuck@you.pass', password: 'not your password' });
// 	console.log(res);

function check(field) {
	return new ValidatorsChain(field);
}

function useValidator(...checks) {
	const validator = new Validator(checks);

	return (targetObject) => validator.validate(targetObject);
}

export { check, useValidator };
