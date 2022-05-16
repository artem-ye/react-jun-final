import React from 'react';

const ListItemSubmitButtons = ({ buttonsSet }) => {
	return (
		<div className='btn-group'>
			<button
				className='btn btn-secondary btn-sm me-2'
				name={buttonsSet[0].name}
				disabled={buttonsSet[0].isDisabled}
			>
				{buttonsSet[0].title}
			</button>
			<button className='btn btn-danger btn-sm' name={buttonsSet[1].name} disabled={buttonsSet[1].isDisabled}>
				{buttonsSet[1].title}
			</button>
		</div>
	);
};

export default ListItemSubmitButtons;
