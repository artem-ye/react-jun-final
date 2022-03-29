import React from 'react';

const ProductsOrderSelect = ({ options, onSelect }) => {
	const handleSelect = (event) => {
		onSelect(options[event.target.selectedIndex].value);
	};

	return (
		<select className='form-select form-select-sm' aria-label='.form-select-sm example' onChange={handleSelect}>
			{options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.title}
				</option>
			))}
		</select>
	);
};

export default ProductsOrderSelect;
