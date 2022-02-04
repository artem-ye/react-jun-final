import React from 'react';

const SearchBar = () => {
	return (
		<div className="input-group mb-3">
			<input
				type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
			/>
			<span className="input-group-text" id="basic-addon2">search</span>
		</div>
	);
}

export default SearchBar;