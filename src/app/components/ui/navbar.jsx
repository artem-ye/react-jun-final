import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<div className='nav'>
					<span className='navbar-brand'>Navbar text with an inline element</span>
				</div>
				<div className='nav'>
					<span className='navbar-text'>
						<Link to='/login' className='text-primary text-decoration-none'>
							login
						</Link>
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
