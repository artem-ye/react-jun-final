import React from 'react';
import ListItemSubmitButtons from './listItemButtons';

const SUBMITTERS = {
	BTN_SAVE: 'BTN_SAVE',
	BTN_DELETE: 'BTN_DELETE',
};

const ListItemEditButtons = ({ isDisabled }) => {
	const buttonsSet = [
		{ title: 'СОХРАНИТЬ', name: SUBMITTERS.BTN_SAVE, isDisabled },
		{ title: 'УДАЛИТЬ', name: SUBMITTERS.BTN_DELETE, isDisabled },
	];
	return <ListItemSubmitButtons buttonsSet={buttonsSet} />;
};

export { ListItemEditButtons, SUBMITTERS as EDIT_SUBMITTERS };
