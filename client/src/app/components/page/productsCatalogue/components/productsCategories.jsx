import React from 'react';

const ProductCategoryItem = ({ category, isActive, onClick }) => {
	const { title, _id } = category;
	const handleClick = () => onClick(_id);

	const className = 'list-group-item' + (isActive ? ' active' : '');
	return (
		<li className={className} onClick={handleClick} role='button'>
			{title}
		</li>
	);
};

const ProductsCategories = ({ productsCategories, activeCategoryId, onSelect }) => {
	return (
		<ul className='list-group'>
			{productsCategories.map((category) => {
				const isActive = activeCategoryId === category._id;
				return (
					<ProductCategoryItem
						key={category._id}
						category={category}
						isActive={isActive}
						onClick={onSelect}
					/>
				);
			})}
		</ul>
	);
};

export default ProductsCategories;
