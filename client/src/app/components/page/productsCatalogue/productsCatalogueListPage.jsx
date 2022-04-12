import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProductsCatalogueLoader from '../../../containers/productsCatalogueLoader';

import { getProductsByCategory } from '../../../store/reducers/products.reducer';
import { getProductsCategories } from '../../../store/reducers/productsCategories.reducer';
import { getSearchBarValue } from '../../../store/reducers/searchBar.reducer';

import { Pagination, paginationUtils } from '../../common/pagination';
import ProductCatalogueItem from '../../ui/product/productCatalogueItem';
import ProductsCategories from './components/productsCategories';
import ProductsOrderSelect from './components/productsOrderSelect';

const PRODUCTS_PER_PAGE = 10;

const ProductsCatalogueList = () => {
	return (
		<ProductsCatalogueLoader>
			<CatalogueList></CatalogueList>
		</ProductsCatalogueLoader>
	);
};

const CatalogueList = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const paginationCurrentPageIndex = Number(searchParams.get('page')) || 0;
	const setPaginationCurrentPageIndex = (pageIndex) => {
		setSearchParams({ page: pageIndex });
		window.scrollTo(0, 0);
	};

	// Filters
	const sortOptions = [
		{ title: 'Цена (по возрастанию)', value: 'priceAsc' },
		{ title: 'Цена (по убыванию)', value: 'priceDesc' },
		{ title: 'Артикул', value: 'sku' },
		{ title: 'Наименование', value: 'title' },
	];
	const [sortOrder, setSortOrder] = useState(sortOptions[0].value);
	const searchBarValue = useSelector(getSearchBarValue);

	const productsCategories = useSelector(getProductsCategories());
	const currentCategoryId = params.categoryId || productsCategories[0]?._id;

	// Apply sort/filter
	let products = useSelector(getProductsByCategory(currentCategoryId));
	products = sortProducts(products, sortOrder);
	products = filterProducts(products, searchBarValue);

	// pagination
	const PAGINATION_PAGES_COUNT = paginationUtils.pagesCount(products, PRODUCTS_PER_PAGE);
	products = paginationUtils.paginate(products, PRODUCTS_PER_PAGE, paginationCurrentPageIndex);

	// Pagination handlers
	const resetPagination = () => {
		if (paginationCurrentPageIndex !== 0) {
			setPaginationCurrentPageIndex(0);
		}
	};

	const handlePageChange = (pageIndex) => {
		setPaginationCurrentPageIndex(pageIndex);
	};

	// Other handlers
	const handleCategorySelect = (categoryId) => {
		resetPagination();
		navigate('/category/' + categoryId);
	};

	const handleSortOrderChange = (order) => {
		resetPagination();
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
			<div className='d-flex align-items-center justify-content-center'>
				<Pagination
					pagesCount={PAGINATION_PAGES_COUNT}
					activePageIndex={paginationCurrentPageIndex}
					onPageChange={handlePageChange}
				/>
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
