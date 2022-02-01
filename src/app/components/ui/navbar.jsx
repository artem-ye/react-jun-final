import React from 'react';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<div className='navbar'>
					<span class='navbar-brand'>Navbar text with an inline element</span>
				</div>
				<div className='navbar'>
					<span class='navbar-text'>
						<a href='/login' className='nav-link active'>
							login
						</a>
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
<h1>Navbar component</h1>;
