import React, {useEffect}from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actionCreators from '../../../store/actions/acIndex';

const Logout = (props) => {

	const {onLogout, ReduxSetIngredients} = props;

	useEffect(() => {
		onLogout();
		ReduxSetIngredients();
	
	},[onLogout, ReduxSetIngredients]);

	return(
		<Redirect to='/auth' />
	);
};


const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actionCreators.logout()),
		ReduxSetIngredients: () => dispatch( actionCreators.initIngridients() ),
	};
};

export default connect(null, mapDispatchToProps)(Logout);