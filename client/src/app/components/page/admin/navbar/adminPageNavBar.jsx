import React from 'react';
import { Link } from 'react-router-dom';

const AdminPageNavBar = () => {
	return (
		<ul className='nav'>
			<li className='nav-item'>
				<Link className='nav-link active' aria-current='page' to='/admin/products'>
					Товары
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link active' aria-current='page' to='/admin/categories'>
					Категории
				</Link>
			</li>
		</ul>
	);
};

export default AdminPageNavBar;
