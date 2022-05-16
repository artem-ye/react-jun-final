import React from 'react';

import { useSelector } from 'react-redux';
import { toastError } from '../../../../../services/toast.service';
import {
	getProductsCategories,
	getProductsCategoryById,
} from '../../../../../store/reducers/productsCategories.reducer';

import { check, useValidator } from '../../../../../utils/validator';
import { SUBMITTERS } from '../../../../common/list/submitControls';
import AdminProductsListItemView from './view';

const AdminProductsListItemController = ({ data: product, onSubmit, disabled, mode, children }) => {
	const productsCategories = useSelector(getProductsCategories());

	const { _id: categoryId, title: categoryTitle } =
		useSelector(getProductsCategoryById(product?.category)) || productsCategories[0];
	const { _id: productId, sku, title, price, count, image } = { ...product };

	const productsCategoriesOptions = productsCategories.map((category) => {
		return {
			value: category._id,
			title: category.title,
		};
	});

	const formData = {
		productId: productId || 0,
		sku: sku || '',
		title: title || '',
		price: price || 0,
		count: count || 0,
		image: image || '',
		categoryId,
		categoryTitle,
	};

	const validate = useValidator(
		check('sku').isNotEmptyString('Артикул не может быть пустым'),
		check('price').isNotEmptyString('Цена не может быть пустым'),
		check('title').isNotEmptyString('Наименование не может быть пустым'),
		check('image').isNotEmptyString('Изображение не может быть пустым')
	);

	const handleSubmit = ({ data, errors, submitter }) => {
		const submitterName = submitter.name;
		const { productId, categoryId, ...postData } = data;
		postData._id = productId;
		postData.category = categoryId;

		const isValidationFailed = Object.keys(errors || {}).length > 0;
		const isValidationRequired = submitterName === SUBMITTERS.BTN_SAVE || submitter === SUBMITTERS.BTN_CREATE;

		if (isValidationFailed && isValidationRequired) {
			toastError('Запись содержит ошибки');
			return;
		}

		onSubmit(submitterName, { data: postData, errors });
	};

	return (
		<AdminProductsListItemView
			formData={formData}
			validate={validate}
			handleSubmit={handleSubmit}
			isDisabled={disabled}
			productsCategoriesOptions={productsCategoriesOptions}
			viewMode={mode}
		>
			{!!children ? (
				React.cloneElement(children, { isDisabled: disabled })
			) : (
				<span>AdminProductsListItemController: Buttons set must be provided as children</span>
			)}
		</AdminProductsListItemView>
	);
};

export default AdminProductsListItemController;
