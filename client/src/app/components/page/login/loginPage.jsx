import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { check, useValidator } from '../../../utils/validator';
import PageTitle from '../../common/pageTitle';
import FormInputField from '../../common/form/formInputField';

import { getLoginError, logIn as logInAction } from '../../../store/reducers/user.reducer';
import { toastError } from '../../../services/toast.service';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginError = useSelector(getLoginError);

	const [data, setData] = useState({ email: '', password: '' });
	const [validationErrors, setValidationErrors] = useState({});

	// prettier-ignore
	const validate = useValidator(
		check('email').isNotEmptyString('не может быть пустым').isEmail('должен содержать @'),
		check('password').isNotEmptyString('не может быть пустым')
	);

	useEffect(() => {
		if (loginError) {
			toastError('Ошибка авторизации');
		}
	}, [loginError]);

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationRes = validate(data);

		if (Object.keys(validationRes).length === 0) {
			const { email, password } = data;
			const isLoginSuccess = await dispatch(logInAction({ email, password }));

			if (isLoginSuccess) {
				navigate('/');
			}
		} else {
			setValidationErrors(validationRes);
		}
	};

	return (
		<form className='row justify-content-center' onSubmit={handleSubmit}>
			<div className='col-6 justify-content-center'>
				<PageTitle title='АВТОРИЗАЦИЯ' />
				<div className='mb-3 row mt-5'>
					<FormInputField
						title='Email адрес'
						name='email'
						value={data.email}
						errors={validationErrors.email}
						onChange={handleDataChange}
						type='email'
						placeholder='адрес@электро.почты'
					/>
				</div>
				<div className='mb-3 row'>
					<FormInputField
						title='Пароль'
						name='password'
						value={data.password}
						errors={validationErrors.password}
						onChange={handleDataChange}
						type='password'
					/>
					<div className='col-12 d-flex justify-content-center mt-5'>
						<button className='btn btn-primary col-sm-4 align-self-center'>Войти</button>
					</div>
					{loginError && <p className='text-danger text-center mt-2'>Ошибка авторизации</p>}
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
