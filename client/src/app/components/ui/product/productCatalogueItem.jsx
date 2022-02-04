import React from 'react';
import { Link } from 'react-router-dom';

const ProductCatalogueItem = () => {
    return (
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
                <div className='col-md-10'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            <Link to='/product/123' className='text-decoration-none text-black'>
                                Сумка клевая
                            </Link>
                        </h5>
                        <p className='card-text'>
                            This is a wider card with supporting text below as a natural lead-in to additional
                            content. This content is a little bit longer.
                        </p>
                        <p className='card-text'>
                            <small className='text-muted'>Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCatalogueItem;