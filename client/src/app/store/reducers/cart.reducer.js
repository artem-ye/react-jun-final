import { createSlice } from '@reduxjs/toolkit';
import { check, createValidator } from '../../utils/validator/hook';

const CartItemFactory = {
	_ITEM_PROTO: {
		productId: '',
		price: 0,
		count: 0,
		sum: 0,
		errors: {},
	},

	_validate: createValidator(
		check('count').isCount('Не верно указано количество'),
		check('productId').isNotEmptyString('Не заполнен productId')
	),

	create({ ...itemProps }) {
		return {
			...this._ITEM_PROTO,
			...itemProps,
		};
	},

	validate(item) {
		return this._validate(item);
	},
};

const INITIAL_STATE = {
	entities: [],
	totalSum: 0,
	totalCount: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: INITIAL_STATE,
	reducers: {
		addItem: (state, action) => {
			const { productId, count, ...rest } = CartItemFactory.create(action.payload);
			const index = state.entities.findIndex((item) => item._id === productId);

			if (index >= 0) {
				const item = state.entities[index];
				item.count.count += count;
				item.sum = count * item.price;
			} else {
				state.entities.push({ productId, count, ...rest });
			}
		},
		updateItemCount: (state, action) => {
			const { productId, count } = action.payload;

			const index = state.entities.findIndex((item) => item.productId === productId);

			if (index >= 0) {
				const item = state.entities[index];
				item.count = Number(count);
				item.sum = Number(count) * item.price;
			}
		},
		deleteItem: (state, action) => {
			state.entities = state.entities.filter((item) => item.productId !== action.payload);
		},

		validateItem: (state, action) => {
			const { productId } = action.payload;
			const item = state.entities.find((cartItem) => cartItem.productId === productId);
			item.errors = CartItemFactory.validate(item);
		},

		updateTotals: (state) => {
			state.totalSum = 0;
			state.totalCount = 0;

			state.entities.forEach((item) => {
				state.totalSum += item.sum;
				state.totalCount += item.count;
			});
		},
	},
});

const { reducer: cartReducer, actions } = cartSlice;

const addCartItem = (item) => (dispatch) => {
	dispatch(actions.addItem(item));
	dispatch(actions.validateItem(item));
	dispatch(actions.updateTotals());
};

const updateCartItemCount =
	({ productId, count }) =>
	(dispatch) => {
		dispatch(actions.updateItemCount({ productId, count }));
		dispatch(actions.validateItem({ productId }));
		dispatch(actions.updateTotals());
	};

const deleteCartItem =
	({ productId }) =>
	(dispatch) => {
		dispatch(actions.deleteItem(productId));
		dispatch(actions.updateTotals());
	};

const getCartEntities = () => (state) => state.cart.entities;
const getCartTotals = () => (state) => {
	return {
		totalSum: state.cart.totalSum,
		totalCount: state.cart.totalCount,
	};
};
const getIsCatDataValid = () => (state) => {
	return !state.cart.entities.find(({ errors }) => {
		return Object.keys(errors).length > 0;
	});
};

export { addCartItem, deleteCartItem, updateCartItemCount, getCartEntities, getCartTotals, getIsCatDataValid };

export default cartReducer;
