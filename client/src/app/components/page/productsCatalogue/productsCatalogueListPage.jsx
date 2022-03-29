import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsByCategory, loadProducts } from '../../../store/reducers/products.reducer';
import { getProductsCategories, loadProductsCategories } from '../../../store/reducers/productsCategories.reducer';

import ProductCatalogueItem from '../../ui/product/productCatalogueItem';
import ProductsCategories from './components/productsCategories';
import ProductsOrderSelect from './components/productsOrderSelect';

const ProductsCatalogueList = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const productsCategories = useSelector(getProductsCategories);
	const currentCategoryId = params.categoryId || productsCategories[0]?._id;

	const products = useSelector(getProductsByCategory(currentCategoryId));

	useEffect(() => {
		dispatch(loadProductsCategories());
		dispatch(loadProducts());
	}, []);

	const handleCategorySelect = (categoryId) => {
		navigate('/category/' + categoryId);
	};

	return (
		<div className='row'>
			<div className='col-3'>
				<ProductsCategories
					productsCategories={productsCategories}
					activeCategoryId={currentCategoryId}
					onSelect={handleCategorySelect}
				/>
			</div>
			<div className='col-9'>
				<ProductsOrderSelect />

				{products.map((product) => {
					return <ProductCatalogueItem key={product._id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default ProductsCatalogueList;
