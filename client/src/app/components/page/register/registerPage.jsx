import React from 'react';
import PageTitle from '../../common/pageTitle';

const RegisterPage = () => {
    const email = 'email@example.com';

    return (
        <form className='row justify-content-center'>
            <div className='col-6'>
                <PageTitle title='РЕГИСТРАЦИЯ' />
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
                </div>

                <div className='col-12 d-flex justify-content-center mt-5'>
                    <button className='btn btn-primary col-sm-4 align-self-center'>Зарегестрироваться</button>
                </div>
            </div>
        </form>
    );
};

export default RegisterPage;
