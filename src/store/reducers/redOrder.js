
import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';


const initState = {
	error: null,
	loading: false,
	orders: [],
	purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
	const newOrder = updateObject(action.orderData, {id: action.orderId});
	return updateObject(state,{
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			});
};

const purchaseBurgerFail = (state, action) => {
	return updateObject(state, {
				loading: false,
				error: action.error
			});
};

const fatchOrdersSuccess = (state, action) => {
	return updateObject(state, {
				loading: false,
				orders: action.orders
			});
};


const fatchOrdersFail = (state, action) => {
	return updateObject(state, {
				loading: false,
				error: action.error
			});
};

const reducer = (state = initState, action ) => {

	switch (action.type){
		case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false });
			// return{
			// 	...state,
			// 	purchased: false
			// };
		case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action);
			// const newOrder = {
			// 	id: action.orderId,
			// 	...action.orderData
			// }
			
			// return{
			// 	...state,
			// 	loading: false,
			// 	orders: state.orders.concat(newOrder),
			// 	purchased: true
			// };
		case actionTypes.PURCHASE_BURGER_FAIL : return purchaseBurgerFail(state, action);
			
			// return{
			// 	...state,
			// 	loading: false,
			// 	error: action.error
			// };
		case actionTypes.LOADING_START :return updateObject(state, { loading: true });
			// return{
			// 	...state,
			// 	loading: true
			// };
		case actionTypes.FECHT_ORDERS_SUCCESS: return fatchOrdersSuccess(state, action);
			
			// return{
			// 	...state,
			// 	loading: false,
			// 	orders: action.orders
			// };
		case actionTypes.FECHT_ORDERS_FAIL: return fatchOrdersFail(state, action);
			
			// return{
			// 	...state,
			// 	loading: false,
			// 	error: action.error
			// };
		default: return state;
	}//switch
};

export default reducer;
