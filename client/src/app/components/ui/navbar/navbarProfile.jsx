import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	getIsLoggedIn,
	getIsProfileLoaded,
	getIsProfileLoading,
	getLoadProfileError,
	getProfile,
	loadProfile,
	logOut,
} from '../../../store/reducers/user.reducer';

const UserProfile = ({ userProfile, onLogOut }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);
	const avatar = 'https://avatars.dicebear.com/api/avataaars/ndvbb.svg';

	return (
		<div className='dropdown' onClick={toggleMenu}>
			<div className='btn dropdown-toggle d-flex align-items-center'>
				<div className='me-2'>{userProfile.name}</div>
				<div className='me-2'>
					<img className='img-fluid rounded-circle' alt='...' style={{ width: '30px' }} src={avatar} />
				</div>
			</div>
			<ul className={'dropdown-menu dropdown-menu-end ' + (isOpen ? 'show' : '')} style={{ right: '-12px' }}>
				{/* <Link to={`/users/${currentUser?._id}`} className='dropdown-item'>
					Profile
				</Link> */}
				<li type='button' className='dropdown-item'>
					<Link to='/cart' className='text-black text-decoration-none'>
						<i className='bi bi-cart3 text-secondary'></i>&nbsp;&nbsp;Корзина
					</Link>
				</li>
				<li type='button' onClick={onLogOut} className='dropdown-item '>
					<i className='bi bi-box-arrow-left text-secondary'></i>&nbsp;&nbsp;Выйти
				</li>
			</ul>
		</div>
	);
};

const NavbarProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isUserProfileLoaded = useSelector(getIsProfileLoaded);
	const isUserProfileLoading = useSelector(getIsProfileLoading);
	const loadProfileError = useSelector(getLoadProfileError);
	const isAuthorizedUser = useSelector(getIsLoggedIn);

	const userProfile = useSelector(getProfile);

	useEffect(() => {
		if (!isUserProfileLoaded && isAuthorizedUser && !isUserProfileLoading) {
			dispatch(loadProfile);
		}
	}, [isUserProfileLoaded, isAuthorizedUser, isUserProfileLoading, dispatch]);

	const handleLogOut = () => {
		dispatch(logOut());
		navigate('/');
	};

	if (!isUserProfileLoaded || !isAuthorizedUser || loadProfileError) {
		return (
			<span className='navbar-text'>
				<Link to='/login' className='text-primary text-decoration-none'>
					login
				</Link>
			</span>
		);
	}

	return <UserProfile userProfile={userProfile} onLogOut={handleLogOut} />;
};

export default NavbarProfile;
