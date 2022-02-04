import React from 'react';

const ProductPage = () => {
	return (
		<>
			<h5 className='text-center'>Сумки / Афигенные</h5>
			<div className='card mb-3 mt-2'>
				<div className='row g-0'>
					<div className='col-md-2 align-items-center justify-content-center d-flex'>
						<img
							src='http://img.nothingshop.com/images/200151/default/preview.jpg'
							className='img-fluid rounded-start'
							alt='...'
							style={{ maxWidth: '100px' }}
						/>
					</div>
					<div className='col-md-8'>
						<div className='card-body'>
							<h5 className='card-title'>Сумка клевая</h5>
							<p className='card-text'>
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
							</p>
							<p className='card-text'>
								<small className='text-muted'>Last updated 3 mins ago</small>
							</p>
						</div>
					</div>
					<div className='col-md-2 align-items-center justify-content-center d-flex'>
						<button className='btn btn-primary btn-lg'>BUY</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPage;
