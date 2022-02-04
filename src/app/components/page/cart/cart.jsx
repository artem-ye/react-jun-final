import React from 'react';
import PageTitle from '../../common/pageTitle';
import SearchBar from '../../common/searchbar';
import CartProduct from './cartProduct';
import TextField from './components/textField';

const CartPage = () => {
    const PAGE_TITLE = "КОРЗИНА"

    return (
        <>
            <PageTitle title={PAGE_TITLE} />
            <SearchBar />
            <div className='row'>
                <div className='col-9'>
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                </div>
                <div className='col-3'>
                    <div className='card mb-3 mt-2'>
                        <div className='card-body'>
                            <TextField title={'Количество'} value={'14 шт.'} />
                            <TextField title={'Сумма'} value={'1 200.00 $'} />
                            <button className='btn btn-primary'>Оформить заказ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;