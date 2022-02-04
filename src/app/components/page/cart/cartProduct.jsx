import React from 'react';
import { Link } from 'react-router-dom';
import TextField from './components/textField';

const CartProduct = () => {
    return (
        <div className='card mb-3 mt-2'>
            <div className='row g-0'>
                <div className='col-md-2 align-items-center justify-content-center d-flex'>
                    <img
                        src='http://img.nothingshop.com/images/200151/default/preview.jpg'
                        className='img-fluid rounded-start'
                        alt='...'
                        style={{ maxWidth: '75px' }}
                    />
                </div>

                <div className='col-md-4'>
                    <div className='card-body'>
                        <TextField title={'Сумка клевая'} value={'Мега афигенная'} />
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='card-body'>
                        <TextField title={'Количество'} value={'14 шт.'} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body'>
                        <TextField title={'Сумма'} value={'1 200.00 $'} />
                    </div>
                    <button type='button' className='btn-light border-0 position-absolute top-0 end-0' aria-label='Close'>&#x2715;</button>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
