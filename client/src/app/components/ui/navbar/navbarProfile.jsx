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

	const navigate = useNavigate();
	const createLinkHandler = (url) => () => navigate(url);

	const menuItems = [
		{ title: 'Admin', icon: 'bi-gear', onClick: createLinkHandler('/admin'), disabled: !userProfile.isAdmin },
		{ title: 'Корзина', icon: 'bi-cart3', onClick: createLinkHandler('/cart') },
		{ title: 'Выйти', icon: 'bi-box-arrow-left', onClick: onLogOut },
	];

	return (
		<div className='dropdown' onClick={toggleMenu}>
			<div className='btn dropdown-toggle d-flex align-items-center'>
				<div className='me-2'>{userProfile.name}</div>
				<div className='me-2'>
					<img className='img-fluid rounded-circle' alt='...' style={{ width: '30px' }} src={avatar} />
				</div>
			</div>
			<ul className={'dropdown-menu dropdown-menu-end ' + (isOpen ? 'show' : '')} style={{ right: '-12px' }}>
				{menuItems.map((item, key) => {
					const { title, icon, onClick, disabled } = item;
					return (
						<ProfileMenuItem key={key} title={title} icon={icon} onClick={onClick} disabled={disabled} />
					);
				})}
			</ul>
		</div>
	);
};

const ProfileMenuItem = ({ title, icon, onClick, disabled }) => {
	if (disabled) {
		return null;
	}

	return (
		<li type='button' onClick={onClick} className='dropdown-item '>
			<i className={`bi ${icon} text-secondary`}></i>&nbsp;&nbsp;{title}
		</li>
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
