import React from 'react';
import CardEditField from '../../../../common/card/cardEditField';
import { ListRow, ListRowColumn } from '../../../../common/list';

const AdminCategoriesListItemView = ({ data, validate, handleSubmit, isDisabled, children }) => {
	return (
		<ListRow data={data} validate={validate} onSubmit={handleSubmit}>
			<ListRowColumn width={9} title='Наименование' datafieldname='categoryTitle' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={3} className='text-end'>
				{children}
			</ListRowColumn>
		</ListRow>
	);
};

export default AdminCategoriesListItemView;
