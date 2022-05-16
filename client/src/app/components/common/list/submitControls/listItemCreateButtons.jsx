import React from 'react';
import ListItemSubmitButtons from './listItemButtons';

const SUBMITTERS = {
	BTN_CREATE: 'BTN_SAVE',
	BTN_CANCEL_CREATE: 'BTN_DELETE',
};

const ListItemCreateButtons = ({ isDisabled }) => {
	const buttonsSet = [
		{ title: 'СОЗДАТЬ', name: SUBMITTERS.BTN_CREATE, isDisabled },
		{ title: 'ОТМЕНА', name: SUBMITTERS.BTN_CANCEL_CREATE, isDisabled },
	];
	return <ListItemSubmitButtons buttonsSet={buttonsSet} />;
};

export { ListItemCreateButtons, SUBMITTERS as CREATE_SUBMITTERS };
