import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsCategories, loadProductsCategories } from '../../../store/reducers/productsCategories.reducer';

import ProductCatalogueItem from '../../ui/product/productCatalogueItem';
import ProductsCategories from './components/productsCategories';

const ProductsCatalogueList = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const productsCategories = useSelector(getProductsCategories);
	const currentCategoryId = params.categoryId || productsCategories[0]?._id;

	useEffect(() => {
		dispatch(loadProductsCategories());
		console.log('rendering...');
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
				<select className='form-select form-select-sm' aria-label='.form-select-sm example'>
					{/* <option selected>Сортировка: По цене</option> */}
					<option value='1'>One</option>
					<option value='2'>Two</option>
					<option value='3'>Three</option>
				</select>

				<ProductCatalogueItem />
			</div>
		</div>
	);
};

export default ProductsCatalogueList;
