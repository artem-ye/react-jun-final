import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	value: '',
};

const searchBarSlice = createSlice({
	name: 'searchBar',
	initialState: INITIAL_STATE,
	reducers: {
		setValue: (state, action) => {
			state.value = action.payload;
		},
		clear: (state) => {
			state.value = '';
		},
	},
});

const { reducer: searchBarReducer, actions } = searchBarSlice;

const setSerchBarValue = (value) => (dispatch) => {
	dispatch(actions.setValue(value));
};

const clearSerchBarValue = () => (dispatch) => {
	dispatch(actions.clear());
};

const getSearchBarValue = (state) => state.searchBar.value;

export { getSearchBarValue, setSerchBarValue, clearSerchBarValue };

export default searchBarReducer;
