import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	pathToRedirect: '/'
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		error: false, 
		loading: false,
		token: action.token,
		userId: action.userId
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error, 
		loading: false
	});
};

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null, userId: null
	});
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {
		pathToRedirect: action.path
	});
};

const reducer = (state = initState, action) => {

	switch (action.type){
		case actionTypes.AUTH_START: return updateObject(state, {error: false, loading: true});
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
		default: return state;

	}; // switch


};

export default reducer;