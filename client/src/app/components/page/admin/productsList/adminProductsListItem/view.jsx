import React from 'react';
import CardEditField from '../../../../common/card/cardEditField';
import CardSelectField from '../../../../common/card/cardSelectField';
import { ListRow, ListRowColumn } from '../../../../common/list';

const AdminProductsListItemView = ({
	formData,
	validate,
	handleSubmit,
	isDisabled,
	productsCategoriesOptions,
	children,
}) => {
	return (
		<ListRow data={formData} validate={validate} onSubmit={handleSubmit} className='row g-0' disabled={isDisabled}>
			<ListRowColumn width={3} title='sku' datafieldname='sku' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={3} title='Наименование' datafieldname='title' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={6} title='Фото' datafieldname='image' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={3} title='Категория' datafieldname='categoryId'>
				<CardSelectField disabled={isDisabled} options={productsCategoriesOptions} />
			</ListRowColumn>
			<ListRowColumn width={3} title='Цена' datafieldname='price' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={3} title='Количество' datafieldname='count' withOnFocusSelect={true}>
				<CardEditField disabled={isDisabled} />
			</ListRowColumn>
			<ListRowColumn width={3} className='text-end'>
				{children}
			</ListRowColumn>
		</ListRow>
	);
};

export default AdminProductsListItemView;
