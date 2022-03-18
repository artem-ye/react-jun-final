import React from 'react';

const ProductCategoryItem = ({ title }) => {
	return <li className='list-group-item'>{title}</li>;
};

const ProductsCategories = ({ productsCategories }) => {
	return (
		<ul className='list-group'>
			{productsCategories.map((category) => {
				return <ProductCategoryItem key={category._id} title={category.title} />;
			})}
		</ul>
	);
};

export default ProductsCategories;
