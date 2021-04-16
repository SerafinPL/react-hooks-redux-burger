import React, {useEffect} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/acIndex';

// class OrdersPage extends Component{

const OrdersPage = props => {
	// const [loadingHook, loadingSetHook] = useState(true);
	// const [ordersHook, ordersSetHook] = useState([]);
	
	// HOOK BASE

	const {onFetchOrders} = props;
	
	useEffect(() => {

		onFetchOrders(props.ReduxToken, props.ReduxUserId);
		
	},[onFetchOrders]); //like componentDidMount
	
	let loading = null;
	if (props.ReduxLoading) {
		loading = <Spinner/>;
	}
	
	return(
		<div>
			{loading}
			{props.ReduxOrders.map(order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))
			}
			
			
		</div>
	);
}

const mapStateToProps = state => {
	return{
		ReduxError: state.order.error,
		ReduxLoading: state.order.loading,
		ReduxOrders: state.order.orders,
		ReduxToken: state.auth.token,
		ReduxUserId: state.auth.userId
	};
};

const mapDispachToProps = dispach => {
	return{
		onFetchOrders: (token, userId) => dispach(actionCreators.fetchOrders(token, userId)) 
	};
};

export default connect(mapStateToProps, mapDispachToProps)( withErrorHandler(OrdersPage, axios) );