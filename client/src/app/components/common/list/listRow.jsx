import React from 'react';
import Form from '../form/from';

const ListRow = ({ children, data, validate, onSubmit }) => {
	return (
		<div className='card mb-3 mt-2'>
			<div className='container-sm'>
				<Form data={data} validate={validate} onSubmit={onSubmit} className='row g-0'>
					{children}
				</Form>
			</div>
		</div>
	);
};

export default ListRow;
