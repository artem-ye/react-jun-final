import React from 'react';

const LoginPage = () => {
    const email = 'email@example.com';

    return (
        <form className='row justify-content-center'>
            <div className='col-6'>
                <h5 className='text-center m-3'>Login</h5>
                <div className='mb-3 row'>
                    <label htmlFor='staticEmail' className='col-sm-2 col-form-label'>
                        Email
                    </label>
                    <div className='col-sm-10'>
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
                    <label htmlFor='inputPassword' className='col-sm-2 col-form-label'>
                        Password
                    </label>
                    <div className='col-sm-10'>
                        <input type='password' className='form-control' id='inputPassword' />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;
