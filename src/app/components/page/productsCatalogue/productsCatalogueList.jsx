import React from 'react';
import ProductCatalogueItem from '../../ui/product/productCatalogueItem';

const ProductsCatalogueList = () => {
	return (
		<div className='row'>
			<div className='col-3'>
				<ul className='list-group'>
					<li className='list-group-item'>Сумки</li>
					<li className='list-group-item'>Купальники</li>
					<li className='list-group-item'>Палки</li>
					<li className='list-group-item'>Пылесосные шланги</li>
					<li className='list-group-item'>Бетон</li>
				</ul>
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
