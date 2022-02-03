import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainContainer from './containers/mainContainer';
import MainPage from './components/page/main/';
import LoginPage from './components/page/login';



function App() {
	// useEffect(() => {
	// 	toastSuccess('App started');
	// }, []);

	return (
		<div className='container-xxl'>
			<MainContainer>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</MainContainer>
			<ToastContainer />
		</div>
	);
}

export default App;
