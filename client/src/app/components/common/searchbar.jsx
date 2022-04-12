import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchBarValue, setSerchBarValue } from '../../store/reducers/searchBar.reducer';

const SearchBar = () => {
	const dispatch = useDispatch();

	const value = useSelector(getSearchBarValue);
	const handleChange = (event) => {
		dispatch(setSerchBarValue(event.target.value));
	};

	return (
		<div className='input-group mb-3'>
			<input
				type='text'
				className='form-control'
				placeholder=''
				aria-label=''
				aria-describedby='basic-addon2'
				value={value}
				onChange={handleChange}
			/>
			<span className='input-group-text' id='basic-addon2'>
				найти
			</span>
		</div>
	);
};

export default SearchBar;
