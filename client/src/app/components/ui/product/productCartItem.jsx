import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItemCount } from '../../../store/reducers/cart.reducer';
import { getProductById } from '../../../store/reducers/products.reducer';
import CardEditField from '../../common/card/cardEditField';
import CardTextField from '../../common/card/cardTextField';

const CartItemProduct = ({ item }) => {
	const dispatch = useDispatch();
	const product = useSelector(getProductById(item.productId));

	const handleDelete = () => {
		dispatch(deleteCartItem(item));
	};

	const handleCountChange = (event) => {
		const count = event.target.value;
		dispatch(
			updateCartItemCount({
				...item,
				count,
			})
		);
	};

	if (!product) {
		return 'ОШИБКА | Товар не найден';
	}

	return (
		<div className='card mb-3 mt-2'>
			<div className='row g-0'>
				<div className='col-md-2 align-items-center justify-content-center d-flex'>
					<img
						src={product.image}
						className='m-3 img-fluid rounded-start'
						alt='...'
						style={{ maxWidth: '75px' }}
					/>
				</div>

				<div className='col-md-4'>
					<div className='card-body'>
						<CardTextField title={product.sku} value={product.title} />
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card-body'>
						<CardEditField
							title={'Количество'}
							value={item.count}
							disabled={false}
							onChange={handleCountChange}
							type='number'
							min='1'
							error={item.errors.count}
						/>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card-body'>
						<CardTextField
							title={'Цена'}
							value={item.price + ' $'}
							// disabled={false}
							onChange={handleCountChange}
							// onBlur={() => console.log('blur')}
						/>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card-body'>
						<CardTextField title={'Сумма'} value={item.sum + ' $'} />
					</div>
					<button
						type='button'
						className='btn-light border-0 position-absolute top-0 end-0'
						aria-label='Close'
						onClick={handleDelete}
					>
						&#x2715;
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItemProduct;
