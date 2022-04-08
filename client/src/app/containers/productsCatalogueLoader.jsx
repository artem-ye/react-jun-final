import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../components/common/spinner';
import { getIsProductsLoaded, getIsProductsLoading, loadProducts } from '../store/reducers/products.reducer';
import {
	getIsProductsCategoriesLoaded,
	getIsProductsCategoriesLoading,
	loadProductsCategories,
} from '../store/reducers/productsCategories.reducer';

const ProductsCatalogueLoader = ({ children }) => {
	const dispatch = useDispatch();

	const isProductsCategoriesLoaded = useSelector(getIsProductsCategoriesLoaded());
	const isProductsCategoriesLoading = useSelector(getIsProductsCategoriesLoading());

	const isProductsLoaded = useSelector(getIsProductsLoaded());
	const isProductsLoading = useSelector(getIsProductsLoading());

	useEffect(() => {
		if (!isProductsLoaded && !isProductsLoading) {
			dispatch(loadProducts());
		}
	}, [isProductsLoaded, isProductsLoading, dispatch]);

	useEffect(() => {
		if (!isProductsCategoriesLoaded && !isProductsCategoriesLoading) {
			dispatch(loadProductsCategories());
		}
	}, [isProductsCategoriesLoaded, isProductsCategoriesLoading, dispatch]);

	if (!isProductsLoaded || !isProductsCategoriesLoaded) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner />
			</div>
		);
	}

	return children;
};

export default ProductsCatalogueLoader;
