import React from 'react';
import CardEditField from '../../common/card/cardEditField';
import CardTextField from '../../common/card/cardTextField';

const CartItemProduct = () => {
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
                        <CardTextField title={'Сумка клевая'} value={'Мега афигенная'} />
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='card-body'>
                        <CardEditField title={'Количество'} value={'14 шт.'} disabled={false} onChange={() => { }} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body'>
                        <CardTextField title={'Сумма'} value={'1 200.00 $'} />
                    </div>
                    <button type='button' className='btn-light border-0 position-absolute top-0 end-0' aria-label='Close'>&#x2715;</button>
                </div>
            </div>
        </div>
    );
};

export default CartItemProduct;