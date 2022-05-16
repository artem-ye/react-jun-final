import React from 'react';

import { check, useValidator } from '../../../../../utils/validator';
import AdminCategoriesListItemView from './view';

const AdminCategoriesListItemController = ({ data, onSubmit, disabled, viewMode, children }) => {
	const { _id: categoryId, title: categoryTitle } = data || {};

	const formData = {
		categoryId: categoryId || 0,
		categoryTitle: categoryTitle || '',
	};

	const validate = useValidator(check('categoryTitle').isNotEmptyString('Наименование не может быть пустым'));

	const handleSubmit = ({ data, errors, submitter }) => {
		const submitterName = submitter.name;
		onSubmit(submitterName, data, errors);
	};

	return (
		<AdminCategoriesListItemView
			data={formData}
			validate={validate}
			handleSubmit={handleSubmit}
			isDisabled={disabled}
			viewMode={viewMode}
		>
			{!!children ? (
				React.cloneElement(children, { isDisabled: disabled })
			) : (
				<span>'AdminCategoriesListItemController: Buttons set must be provided as children '</span>
			)}
		</AdminCategoriesListItemView>
	);
};

export default AdminCategoriesListItemController;
