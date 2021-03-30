import React, {useEffect} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/acIndex';

// class OrdersPage extends Component{

const OrdersPage = (props) => {
	// const [loadingHook, loadingSetHook] = useState(true);
	// const [ordersHook, ordersSetHook] = useState([]);
	
	// HOOK BASE

	 useEffect(() => {

		props.onFetchOrders(props.ReduxToken, props.ReduxUserId);
	// 	axios.get('/orders.json')
	// 		.then(response => {
	// 			const fatchedOrders = [];
	// 			for (let key in response.data){
	// 				fatchedOrders.push({
	// 					...response.data[key],
	// 					id: key

	// 				});
	// 			}
	// 			ordersSetHook(fatchedOrders);
				
	// 			loadingSetHook(false);
	// 		})
	// 		.catch(error => {
	// 			loadingSetHook(false);
	// 		});

	 },[]); //like componentDidMount
	// CLASS BASE
	// state ={
	// 	orders: [],
	// 	loading: true
	// }

	// componentDidMount() {
	// 	axios.get('/orders.json')
	// 		.then(response => {
	// 			const fatchedOrders = [];
	// 			for (let key in response.data){
	// 				fatchedOrders.push({
	// 					...response.data[key],
	// 					id: key

	// 				});
	// 			}
	// 			this.setState({loading:false, orders: fatchedOrders});
	// 		})
	// 		.catch(error => {
	// 			this.setState({loading:false});
	// 		});
	// }

	// render(){
	let loading = null;
	if (props.ReduxLoading) {
		loading = <Spinner/>;
	}
	  

		return(
			<div>
				{loading}
				{//this.state.orders.map(order => (
					
					props.ReduxOrders.map(order => (
						<Order 
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
						/>
					))
				}
				
				
			</div>
		);

	// }
	

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