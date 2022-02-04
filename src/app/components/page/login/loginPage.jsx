import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../common/pageTitle';

const LoginPage = () => {
    const email = 'email@example.com';

    return (
        <form className='row justify-content-center'>
            <div className='col-6 justify-content-center'>
                <PageTitle title='АВТОРИЗАЦИЯ' />
                <div className='mb-3 row mt-5'>
                    <label htmlFor='staticEmail' className='col-sm-3 col-form-label'>
                        email
                    </label>
                    <div className='col-sm-9'>
                        <input
                            type='text'
                            className='form-control-plaintext'
                            id='staticEmail'
                            value={email}
                            onChange={() => { }}
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='inputPassword' className='col-sm-3 col-form-label'>
                        пароль
                    </label>
                    <div className='col-sm-9'>
                        <input type='password' className='form-control' id='inputPassword' />
                    </div>

                    <div className='col-12 d-flex justify-content-center mt-5'>
                        <button className='btn btn-primary col-sm-4 align-self-center'>Войти</button>
                    </div>

                    <div className='col-12 d-flex justify-content-center mt-1'>
                        <Link to='/register' className='text-decoration-none fs-6 mt-3'>Еще не зарегестрирован? <u>Регистрация</u></Link>
                    </div>
                </div>

            </div>

        </form>
    );
};

export default LoginPage;
