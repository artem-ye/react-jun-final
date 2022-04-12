import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from '../../common/searchbar';
import ProductPage from './productPage';
import ProductsCatalogueList from './productsCatalogueListPage';

const ProductsCatalogue = () => {
	return (
		<div className='container mt-2'>
			<SearchBar />
			<Routes>
				<Route path='/*' element={<ProductsCatalogueList />} />
				<Route path='/category/:categoryId' element={<ProductsCatalogueList />} />
				<Route path='/product/:id' element={<ProductPage />} />
			</Routes>
		</div>
	);
};

export default ProductsCatalogue;
