import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getLoginError } from '../../../store/reducers/user.reducer';

import PageTitle from '../../common/pageTitle';
import FormInputField from '../../common/form/formInputField';
import { check, useValidator } from '../../../utils/validator';
import { toastError } from '../../../services/toast.service';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const loginError = useSelector(getLoginError);

	const [data, setData] = useState({ email: '', password: '' });
	const [validationErrors, setValidationErrors] = useState({});

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
			// alert('Ok!!!');

			const userData = { ...data };
			userData.name = userData.email.split('@')[0] || userData.name;
			userData.image = 'fuck you!!!';

			// const { email, password } = data;
			// const isLoginSuccess = await dispatch(logInAction({ email, password }));

			// if (isLoginSuccess) {
			// 	navigate('/');
			// }
		} else {
			setValidationErrors(validationRes);
		}
	};

	const email = 'email@example.com';

	return (
		<form className='row justify-content-center' onSubmit={handleSubmit}>
			<div className='col-6'>
				<PageTitle title='РЕГИСТРАЦИЯ' />
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
					{/* <div className='col-12 d-flex justify-content-center mt-1'>
						<Link to='/login' className='text-decoration-none fs-6 mt-3'>
							Уже зарегестрирован? <u>Войти</u>
						</Link>
					</div> */}
				</div>
			</div>
		</form>
	);
};

export default RegisterPage;
