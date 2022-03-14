import React from 'react';
import NavbarProfile from './navbarProfile';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<div className='nav'>
					<span className='navbar-brand'>Navbar text with an inline element</span>
				</div>
				<div className='nav'>
					<NavbarProfile />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
