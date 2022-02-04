import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from '../../common/searchbar';
import ProductCard from './productCard';
import ProductsList from './productsList';

const ProductsCatalogue = () => {
	return (
		<div className='container mt-2'>
			<SearchBar />
			<Routes>
				<Route path='/*' element={<ProductsList />} />
				<Route path='/product/:id' element={<ProductCard />} />
			</Routes>
		</div>
	);
};

export default ProductsCatalogue;
