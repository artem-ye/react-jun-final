import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductsCatalogueLoader from '../../../containers/productsCatalogueLoader';
import { addCartItem } from '../../../store/reducers/cart.reducer';
import { getProductById } from '../../../store/reducers/products.reducer';
import { getProductsCategoryById } from '../../../store/reducers/productsCategories.reducer';

const Product = () => {
	const params = useParams();

	const PRODUCT_ID = params.id;
	const product = useSelector(getProductById(PRODUCT_ID));
	const productCategory = useSelector(getProductsCategoryById(product.category));

	const dispatch = useDispatch();
	const handleAddToCart = () => {
		dispatch(addCartItem({ productId: PRODUCT_ID, count: 1 }));
	};

	if (!product) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<span>404 не найдено</span>
			</div>
		);
	}

	return (
		<>
			<h5 className='text-center'>
				<Link className='link-secondary text-decoration-none' to={'/category/' + product.category}>
					{productCategory.title}
				</Link>
			</h5>
			<div className='card mb-3 mt-2'>
				<div className='row g-0'>
					<div className='col-md-2 align-items-center justify-content-center d-flex'>
						<img
							src={product.image}
							className='img-fluid rounded-start m-2'
							alt='...'
							style={{ maxWidth: '100px' }}
						/>
					</div>
					<div className='col-md-8'>
						<div className='card-body'>
							<h5 className='card-title'>{product.sku}</h5>
							<p className='card-text'>{product.title}</p>
							<p className='card-text'>
								<small className='text-muted'>{product.price} USD</small>
							</p>
						</div>
					</div>
					<div className='col-md-2 align-items-center justify-content-center d-flex'>
						<button className='btn btn-primary btn-lg' onClick={handleAddToCart}>
							В КОРЗИНУ
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const ProductCard = () => {
	return (
		<ProductsCatalogueLoader>
			<Product />
		</ProductsCatalogueLoader>
	);
};

export default ProductCard;
