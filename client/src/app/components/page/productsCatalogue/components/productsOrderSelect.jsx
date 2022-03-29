import React from 'react';

const ProductsOrderSelect = ({ onSelect }) => {
	return (
		<select className='form-select form-select-sm' aria-label='.form-select-sm example'>
			<option selected value='price'>
				Цена
			</option>
			<option value='sku'>Артикул</option>
			<option value='title'>Наименование</option>
		</select>
	);
};

export default ProductsOrderSelect;
