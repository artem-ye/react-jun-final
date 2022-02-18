import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../common/pageTitle';
import { check, useValidator } from '../../../utils/validator';

const LoginPage = () => {
	const [data, setData] = useState({ email: '', password: '' });
	const [validationErrors, setValidationErrors] = useState(null);
	// prettier-ignore
	const validate = useValidator(
		check('email').isNotEmptyString("can't be empty").isEmail("must be an email"),
		check('password').isNotEmptyString("can't be empty")
	);

	const handleDataChange = (event) => {
		setData((prev) => {
			const { name, value } = event.target;
			return { ...prev, [name]: value };
		});

		const validationRes = validate(data);
		if (validationErrors !== validationRes) {
			setValidationErrors(validationRes);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationRes = validate(data);
		console.log(validationRes);
	};

	return (
		<form className='row justify-content-center' onSubmit={handleSubmit}>
			<div className='col-6 justify-content-center'>
				<PageTitle title='АВТОРИЗАЦИЯ' />
				<div className='mb-3 row mt-5'>
					<label htmlFor='staticEmail' className='col-sm-3 col-form-label'>
						email
					</label>
					<div className='col-sm-9'>
						<input
							type='text'
							className='form-control'
							id='staticEmail'
							name='email'
							value={data.email}
							placeholder='email@address'
							onChange={handleDataChange}
						/>
					</div>
				</div>
				<div className='mb-3 row'>
					<label htmlFor='inputPassword' className='col-sm-3 col-form-label'>
						пароль
					</label>
					<div className='col-sm-9'>
						<input
							type='password'
							className='form-control'
							id='inputPassword'
							name='password'
							value={data.password}
							onChange={handleDataChange}
						/>
					</div>

					<div className='col-12 d-flex justify-content-center mt-5'>
						<button className='btn btn-primary col-sm-4 align-self-center'>Войти</button>
					</div>

					<div className='col-12 d-flex justify-content-center mt-1'>
						<Link to='/register' className='text-decoration-none fs-6 mt-3'>
							Еще не зарегестрирован? <u>Регистрация</u>
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
};

// const InputField = (title, name, value, onChange, error, ...rest) => {
// 	return (
// 		<>
// 			<label htmlFor='inputPassword' className='col-sm-3 col-form-label'>
// 				{title}
// 			</label>
// 			<div className='col-sm-9'>
// 				<input
// 					// type='password'
// 					className={'form-control' + (error ? ' is-invalid' : '')}
// 					id='inputPassword'
// 					name={name}
// 					value={value}
// 					onChange={onChange}
// 					{...rest}
// 				/>
// 			</div>
// 		</>
// 	);
// };

// const useValidator = () => {
// 	// const config = {
// 	// 	email: {
// 	// 		[VALIDATORS.isRequired]: { message: 'E-mail обязателен для заполнения' },
// 	// 		[VALIDATORS.isEmail]: { message: 'E-mail должен быть адресом элкетронной почты' },
// 	// 	},
// 	// 	password: {
// 	// 		[VALIDATORS.isRequired]: { message: 'Пароль не может быть пустым' },
// 	// 	},
// 	// };
// 	// return (data) => validate(data, config);
// };

export default LoginPage;
