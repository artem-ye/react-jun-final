import React from 'react';
import PageTitle from '../../common/pageTitle';

const LoginPage = () => {
    const email = 'email@example.com';

    return (
        <form className='row justify-content-center'>
            <div className='col-6'>
                <PageTitle title='АВТОРИЗАЦИЯ' />
                <div className='mb-3 row'>
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
            </div>
        </form>
    );
};

export default LoginPage;
