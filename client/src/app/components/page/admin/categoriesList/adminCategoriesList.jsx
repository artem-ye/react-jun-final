import React from 'react';
import { useSelector } from 'react-redux';

import ProductsCatalogueLoader from '../../../../containers/productsCatalogueLoader';
import { getProductsCategories } from '../../../../store/reducers/productsCategories.reducer';

import { List } from '../../../common/list';
import { useControlsBasedItemComponent, BUTTONS_SET } from '../../../common/list/submitControls';
import AdminCategoriesListItem from './adminCategoriesListItem';

const ITEMS_PER_PAGE = 10;
const TITLE = 'Редактирование категорий товаров';

const AdminCategoriesList = () => {
	return (
		<ProductsCatalogueLoader>
			<CategoriesList itemsPerPage={ITEMS_PER_PAGE} />
		</ProductsCatalogueLoader>
	);
};

const CategoriesList = ({ itemsPerPage }) => {
	const EditListItemComponent = useControlsBasedItemComponent(BUTTONS_SET.EDIT, AdminCategoriesListItem);
	const CreateNewListItemComponent = useControlsBasedItemComponent(BUTTONS_SET.CREATE, AdminCategoriesListItem);

	const categories = useSelector(getProductsCategories());

	const handleCreate = ({ data }) => {
		console.log('create', data);
	};

	const handleUpdate = ({ data }) => {
		console.log('update', data);
	};

	const handleDelete = ({ data }) => {
		console.log('delete', data);
	};

	return (
		<List
			title={TITLE}
			itemsPerPage={itemsPerPage}
			data={categories}
			ItemComponent={EditListItemComponent}
			onCreate={handleCreate}
			onDelete={handleDelete}
			onUpdate={handleUpdate}
			CreateItemComponent={CreateNewListItemComponent}
			isCreating={false}
			createError={null}
		/>
	);
};

export default AdminCategoriesList;
