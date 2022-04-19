import React from 'react';
import PageTitle from '../../common/pageTitle';
import SearchBar from '../../common/searchbar';
import CartItemProduct from '../../ui/product/productCartItem';
import CardTextField from '../../common/card/cardTextField';
import { useSelector } from 'react-redux';
import { getCartEntities, getCartTotals, getIsCatDataValid } from '../../../store/reducers/cart.reducer';
import ProductsCatalogueLoader from '../../../containers/productsCatalogueLoader';

const PAGE_TITLE = 'КОРЗИНА';

const CartPage = () => (
	<ProductsCatalogueLoader>
		<Cart />
	</ProductsCatalogueLoader>
);

const Cart = () => {
	const cartItems = useSelector(getCartEntities());
	const isCartDataValid = useSelector(getIsCatDataValid());
	const { totalSum, totalCount } = useSelector(getCartTotals());

	return (
		<>
			<PageTitle title={PAGE_TITLE} />
			<SearchBar />
			<div className='row'>
				<div className='col-9'>
					{cartItems.map((item, index) => (
						<CartItemProduct item={item} key={index} />
					))}
				</div>
				<div className='col-3'>
					<div className='card mb-3 mt-2'>
						<div className='card-body '>
							<CardTextField title={'Количество'} value={totalCount + ' шт.'} />
							<CardTextField title={'Сумма'} value={totalSum + ' $'} />
							<BuyBtn
								isCartDataValid={isCartDataValid}
								isDisabled={!isCartDataValid || cartItems.length === 0}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const BuyBtn = ({ isCartDataValid, isDisabled }) => {
	return (
		<>
			<button
				className={'btn btn-primary form-control' + (isCartDataValid ? '' : ' is-invalid')}
				disabled={isDisabled}
			>
				Оформить заказ
			</button>
			<div id='validationServerUsernameFeedback' className='invalid-feedback'>
				Данные корзины содержат ошибки
			</div>
		</>
	);
};

export default CartPage;
