import React from 'react';
import { Link } from 'react-router-dom';

const ProductCatalogueItem = ({ product }) => {
	const { image, price, sku, title, _id } = product;
	return (
		<div className='card mb-3 mt-2'>
			<div className='row g-0'>
				<div className='col-md-2 align-items-center justify-content-center d-flex'>
					<img src={image} className='img-fluid rounded-start' alt='...' style={{ maxWidth: '100px' }} />
				</div>
				<div className='col-md-10'>
					<div className='card-body'>
						<h5 className='card-title'>
							<Link to={'/product/' + _id} className='text-decoration-none text-black'>
								{sku}
							</Link>
						</h5>
						<p className='card-text'>{title}</p>
						<p className='card-text'>
							<small className='text-muted'>Цена: {price} USD</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCatalogueItem;
