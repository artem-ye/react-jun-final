import { ListItemEditButtons, EDIT_SUBMITTERS } from './listItemEditButtons';
import { ListItemCreateButtons, CREATE_SUBMITTERS } from './listItemCreateButtons';

export const BUTTONS_SET = {
	EDIT: 'EDIT',
	CREATE: 'CREATE',
};

const useControlsBasedItemComponent = (buttonsSet, Component) => {
	return ({ data, disabled, onSave, onDelete, onCreate, onCancelCreate }) => {
		const BUTTON_SET_OPTIONS = {
			[BUTTONS_SET.EDIT]: {
				actions: {
					[EDIT_SUBMITTERS.BTN_SAVE]: onSave,
					[EDIT_SUBMITTERS.BTN_DELETE]: onDelete,
				},
				controls: ListItemEditButtons,
			},
			[BUTTONS_SET.CREATE]: {
				actions: {
					[CREATE_SUBMITTERS.BTN_CREATE]: onCreate,
					[CREATE_SUBMITTERS.BTN_CANCEL_CREATE]: onCancelCreate,
				},
				controls: ListItemCreateButtons,
			},
		};

		const componentOptions = BUTTON_SET_OPTIONS[buttonsSet];

		const handleSubmit = (submitter, ...params) => {
			componentOptions.actions[submitter](...params);
		};

		return (
			<Component data={data} disabled={disabled} onSubmit={handleSubmit} viewMode={buttonsSet}>
				<componentOptions.controls />
			</Component>
		);
	};
};

export default useControlsBasedItemComponent;
