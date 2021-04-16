import React, {useEffect, useCallback}from 'react';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actionCreators from '../../../store/actions/acIndex';

const Logout = (props) => {

	const dispatch = useDispatch();

	const onLogout = useCallback( () => dispatch(actionCreators.logout()) ,[dispatch]);
	const ReduxSetIngredients = useCallback( () => dispatch( actionCreators.initIngridients() ) ,[dispatch]);

	useEffect(() => {
		onLogout();
		ReduxSetIngredients();
	
	},[onLogout, ReduxSetIngredients]);

	return(
		<Redirect to='/auth' />
	);
};

export default Logout;