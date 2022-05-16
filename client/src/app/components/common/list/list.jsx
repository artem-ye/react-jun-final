import React, { useEffect, useState } from 'react';
import PageTitle from '../pageTitle';
import { Pagination, paginationUtils } from '../pagination';

const LIST_MODES = {
	VIEW: 'VIEW',
	CREATE: 'CREATE',
	CREATE_REQUESTED: 'CREATE_REQUESTED',
};

const List = ({
	title,
	ItemComponent,
	itemsPerPage,
	data,
	onDelete,
	onUpdate,
	CreateItemComponent,
	onCreate,
	createError,
	isCreating,
}) => {
	const [listMode, setListMode] = useState(LIST_MODES.VIEW);
	const [paginationCurrentPageIndex, setPaginationCurrentPageIndex] = useState(0);

	const PAGINATION_PAGES_COUNT = paginationUtils.pagesCount(data, itemsPerPage);
	const dataItems = paginationUtils.paginate(data, itemsPerPage, paginationCurrentPageIndex);

	const handlePageChange = (index) => {
		setPaginationCurrentPageIndex(index);
		window.scrollTo(0, 0);
	};

	const handleSave = (data) => {
		onUpdate(data);
	};

	const handleDelete = (data) => {
		onDelete(data);
	};

	const handleSaveNewItem = (data) => {
		onCreate(data);
		setListMode(LIST_MODES.CREATE_REQUESTED);
	};

	const handleCancelSaveNewItem = () => {
		setListMode(LIST_MODES.VIEW);
	};

	const handleSetCreateMode = () => {
		setListMode(LIST_MODES.CREATE);
	};

	useEffect(() => {
		if (listMode === LIST_MODES.CREATE_REQUESTED) {
			// Switch list mode after success submit
			if (isCreating || !!createError) {
				return;
			}

			setListMode(LIST_MODES.VIEW);
		}
	}, [isCreating, createError]);

	return (
		<>
			<div className='row ms-1 me-1'>
				<PageTitle title={title} />
				<button
					className='btn btn-primary btn-sm col-1'
					onClick={handleSetCreateMode}
					disabled={listMode === LIST_MODES.CREATE}
				>
					Создать
				</button>

				{listMode !== LIST_MODES.VIEW && (
					<CreateItemComponent onCreate={handleSaveNewItem} onCancelCreate={handleCancelSaveNewItem} />
				)}

				{dataItems.map((item, key) => {
					return (
						<ItemComponent
							key={item._id}
							data={item}
							onSave={handleSave}
							onDelete={handleDelete}
							disabled={listMode === LIST_MODES.CREATE}
						/>
					);
				})}
			</div>
			<div className='d-flex align-items-center justify-content-center'>
				<Pagination
					pagesCount={PAGINATION_PAGES_COUNT}
					activePageIndex={paginationCurrentPageIndex}
					onPageChange={handlePageChange}
					disabled={listMode === LIST_MODES.CREATE}
				/>
			</div>
		</>
	);
};

export default List;
