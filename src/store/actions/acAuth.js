import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		// authData: authData
		token: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch =>{
		dispatch( authStart() );
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAajveW_nh7r6fSr-xjR3tmVR4uA9zhri0';
		// url to singin
		if (!isSignUp) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAajveW_nh7r6fSr-xjR3tmVR4uA9zhri0'
		}
		axios.post(url, authData)
		.then( response => {
			//console.log(response.data);
			const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.localId);
			//console.log(localStorage);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(error => {
			//console.log(error.response.data.error.message);
			dispatch(authFail(error));
		});
	};
};

export const checkAuthTimeout = (expirationTime) =>{
	return dispatch => {
		setTimeout (() => {
			dispatch(logout());
		},expirationTime*1000-60000);
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	
	return{
		type: actionTypes.AUTH_LOGOUT
	};
};

export const setAuthRedirectPath = (path) => {
	return{
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token){
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			//console.log(expirationDate);
			if (expirationDate > new Date()){
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				//console.log((expirationDate.getTime() - new Date().getTime())/1000)
				dispatch(checkAuthTimeout(( expirationDate.getTime() - new Date().getTime())/1000 ));
			}else{
				dispatch(logout());
			}
		}
		
	};
};
