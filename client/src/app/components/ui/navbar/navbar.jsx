import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarProfile from './navbarProfile';

const Navbar = () => {
	const navigate = useNavigate();
	const handleHome = () => {
		navigate('/');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<div className='nav' onClick={handleHome}>
					<span className='navbar-brand' role='button'>
						MEGA SHOP
					</span>
				</div>
				<div className='nav'>
					<NavbarProfile />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
