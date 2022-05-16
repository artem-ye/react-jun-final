import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductsCatalogueLoader from '../../../../containers/productsCatalogueLoader';
import { toastError } from '../../../../services/toast.service';
import {
	createProduct,
	deleteProduct,
	getIsProductsCreating,
	getProducts,
	getProductsCreateError,
	getProductsDeleteError,
	getProductsUpdateError,
	updateProduct,
} from '../../../../store/reducers/products.reducer';

import { List } from '../../../common/list';
import { BUTTONS_SET, useControlsBasedItemComponent } from '../../../common/list/submitControls';
import AdminProductsListItem from './adminProductsListItem';

const ITEMS_PER_PAGE = 10;
const TITLE = 'Редактирование каталога товаров';

const AdminProductsList = () => {
	return (
		<ProductsCatalogueLoader>
			<ProductsList itemsPerPage={ITEMS_PER_PAGE} />
		</ProductsCatalogueLoader>
	);
};

const ProductsList = ({ itemsPerPage }) => {
	const dispatch = useDispatch();
	const products = useSelector(getProducts());

	const productUpdateError = useSelector(getProductsUpdateError());
	const productsDeleteError = useSelector(getProductsDeleteError());
	const productsCreateError = useSelector(getProductsCreateError());
	const isProductsCreating = useSelector(getIsProductsCreating());

	const EditListItemComponent = useControlsBasedItemComponent(BUTTONS_SET.EDIT, AdminProductsListItem);
	const CreateListItemComponent = useControlsBasedItemComponent(BUTTONS_SET.CREATE, AdminProductsListItem);

	useEffect(() => {
		if (!!productUpdateError) {
			toastError(`Ошибка обновления товара  ${productUpdateError}`);
		}
		if (!!productsDeleteError) {
			toastError(`Ошибка удаления товара  ${productsDeleteError}`);
		}
		if (!!productsCreateError) {
			toastError(`Ошибка создания товара  ${JSON.stringify(productsCreateError)}`);
		}
	}, [productUpdateError, productsDeleteError, productsCreateError]);

	const handleCreate = async ({ data }) => {
		dispatch(createProduct(data));
	};

	const handleUpdate = ({ data }) => {
		dispatch(updateProduct(data));
	};

	const handleDelete = ({ data }) => {
		dispatch(deleteProduct(data));
	};

	return (
		<List
			title={TITLE}
			ItemComponent={EditListItemComponent}
			itemsPerPage={itemsPerPage}
			data={products}
			onUpdate={handleUpdate}
			onDelete={handleDelete}
			CreateItemComponent={CreateListItemComponent}
			isCreating={isProductsCreating}
			createError={productsCreateError}
			onCreate={handleCreate}
		/>
	);
};

export default AdminProductsList;
