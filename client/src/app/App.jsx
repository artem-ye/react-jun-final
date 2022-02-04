import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainContainer from './containers/mainContainer';
import ProductsCatalogue from './components/page/productsCatalogue';
import LoginPage from './components/page/login';
import RegisterPage from './components/page/register';
import CartPage from './components/page/cart/cart';
import AdminProductsCatalogue from './components/page/adminProductsCatalogue';

function App() {
	// useEffect(() => {
	// 	toastSuccess('App started');
	// }, []);

	return (
		<div className='container-xxl'>
			<MainContainer>
				<Routes>
					<Route path='/*' element={<ProductsCatalogue />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/admin/*' element={<AdminProductsCatalogue />} />
				</Routes>
			</MainContainer>
			<ToastContainer />
		</div>
	);
};

export default App;
