import { useEffect } from 'react';
import './App.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './app/components/ui/navbar';

function App() {
	useEffect(() => {
		toast('App started');
	}, []);

	return (
		<div className='container-xxl'>
			<Navbar />
			<h1>Super application</h1>
			<ToastContainer />
		</div>
	);
}

export default App;
