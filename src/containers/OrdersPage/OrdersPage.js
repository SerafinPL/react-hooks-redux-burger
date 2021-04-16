import React, {useEffect, useCallback} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import {useDispatch, useSelector} from 'react-redux';
import * as actionCreators from '../../store/actions/acIndex';

// class OrdersPage extends Component{

const OrdersPage = props => {
	// const [loadingHook, loadingSetHook] = useState(true);
	// const [ordersHook, ordersSetHook] = useState([]);
	
	// HOOK BASE

	const dispatch = useDispatch();

	const onFetchOrders = useCallback( (token, userId) => dispatch( actionCreators.fetchOrders(token, userId) ) , [dispatch]);

	const ReduxLoading = useSelector(state => state.order.loading);
	const ReduxOrders = useSelector(state => state.order.orders);
	const ReduxToken = useSelector(state => state.auth.token);
	const ReduxUserId = useSelector(state => state.auth.userId);

	

	useEffect(() => {

		onFetchOrders(ReduxToken, ReduxUserId);
		
	},[onFetchOrders, ReduxToken, ReduxUserId]); //like componentDidMount
	
	let loading = null;
	if (ReduxLoading) {
		loading = <Spinner/>;
	}
	
	return(
		<div>
			{loading}
			{ReduxOrders.map(order => (
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

export default withErrorHandler(OrdersPage, axios) ;