import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Spinner from '../components/common/spinner';
import LoginPage from '../components/page/login/loginPage';
import { getIsAdminProfile, getIsLoading, getIsLoggedIn, getIsProfileLoading } from '../store/reducers/user.reducer';

const AdminProtectedRoute = ({ children }) => {
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isLogging = useSelector(getIsLoading);
	const isUserProfileLoading = useSelector(getIsProfileLoading);
	const isAdmin = useSelector(getIsAdminProfile);

	const location = useLocation();

	if (isUserProfileLoading || isLogging) {
		return (
			<div className='row justify-content-center mt-5'>
				<Spinner />;
			</div>
		);
	}

	if (!isLoggedIn) {
		return <LoginPage redirectTo={location.pathname} />;
	}

	if (!isAdmin) {
		return (
			<div className='alert alert-danger' role='alert'>
				Вы не обладаете правами администратора!
			</div>
		);
	}

	return children;
};

export default AdminProtectedRoute;
