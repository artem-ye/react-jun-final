import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminProtectedRoute from '../../../containers/adminProtectedRoute';
import AdminCategoriesList from './categoriesList/adminCategoriesList';
import AdminPageNavBar from './navbar/adminPageNavBar';
import AdminProductsList from './productsList/adminProductsList';

const AdminPage = () => {
	return (
		<AdminProtectedRoute>
			<AdminPageNavBar />
			<Routes>
				<Route path='/categories' element={<AdminCategoriesList />} />
				<Route path='/*' element={<AdminProductsList />} />
			</Routes>
		</AdminProtectedRoute>
	);
};

export default AdminPage;
