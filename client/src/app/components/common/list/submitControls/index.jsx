import { CREATE_SUBMITTERS } from './listItemCreateButtons';
import { EDIT_SUBMITTERS } from './listItemEditButtons';
import useControlsBasedItemComponent, { BUTTONS_SET } from './useControlsBasedItemComponent';

const SUBMITTERS = {
	BTN_SAVE: EDIT_SUBMITTERS.BTN_SAVE,
	BTN_DELETE: EDIT_SUBMITTERS.BTN_DELETE,
	BTN_CREATE: CREATE_SUBMITTERS.BTN_CREATE,
	BTN_CANCEL_CREATE: CREATE_SUBMITTERS.BTN_CANCEL_CREATE,
};

export { useControlsBasedItemComponent, BUTTONS_SET, SUBMITTERS };
