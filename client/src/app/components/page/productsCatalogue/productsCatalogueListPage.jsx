import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsByCategory, loadProducts } from '../../../store/reducers/products.reducer';
import { getProductsCategories, loadProductsCategories } from '../../../store/reducers/productsCategories.reducer';
import { getSearchBarValue } from '../../../store/reducers/searchBar.reducer';

import ProductCatalogueItem from '../../ui/product/productCatalogueItem';
import ProductsCategories from './components/productsCategories';
import ProductsOrderSelect from './components/productsOrderSelect';

const ProductsCatalogueList = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	// Filters
	const sortOptions = [
		{ title: 'Цена (по возрастанию)', value: 'priceAsc' },
		{ title: 'Цена (по убыванию)', value: 'priceDesc' },
		{ title: 'Артикул', value: 'sku' },
		{ title: 'Наименование', value: 'title' },
	];
	const [sortOrder, setSortOrder] = useState(sortOptions[0].value);
	const searchBarValue = useSelector(getSearchBarValue);

	const productsCategories = useSelector(getProductsCategories);
	const currentCategoryId = params.categoryId || productsCategories[0]?._id;

	let products = useSelector(getProductsByCategory(currentCategoryId));
	products = sortProducts(products, sortOrder);
	products = filterProducts(products, searchBarValue);

	useEffect(() => {
		dispatch(loadProductsCategories());
		dispatch(loadProducts());
	}, []);

	const handleCategorySelect = (categoryId) => {
		navigate('/category/' + categoryId);
	};

	const handleSortOrderChange = (order) => {
		console.log('Order changed', order);
		setSortOrder(order);
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
				<ProductsOrderSelect options={sortOptions} onSelect={handleSortOrderChange} />

				{products.map((product) => {
					return <ProductCatalogueItem key={product._id} product={product} />;
				})}
			</div>
		</div>
	);
};

function sortProducts(products, sortType) {
	if (sortType === 'sku' || sortType === 'title') {
		const compareFn = (a, b) => (a[sortType] > b[sortType] ? 1 : -1);
		return products.sort(compareFn);
	} else if (sortType === 'priceAsc') {
		const compareFn = (a, b) => (a.price > b.price ? 1 : -1);
		return products.sort(compareFn);
	} else if (sortType === 'priceDesc') {
		const compareFn = (a, b) => (a.price > b.price ? -1 : 1);
		return products.sort(compareFn);
	} else {
		return products;
	}
}

function filterProducts(products, value) {
	if (!value) {
		return products;
	}

	const valueLowerCase = value.toLowerCase();

	return products.filter((product) => {
		return product.title.toLowerCase().includes(valueLowerCase) || product.sku.includes(value);
	});
}

export default ProductsCatalogueList;
