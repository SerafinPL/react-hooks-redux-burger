import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect,withRouter} from 'react-router-dom';

import {useSelector } from 'react-redux';



const Checkout = props => {

	const ReduxIngs = useSelector(state => state.burgerBuilder.ingredients)
	const ReduxPurchased = useSelector(state => state.order.purchased) 

	const CheckoutCancelHandler = () => {
		props.history.goBack();
	}

	const CheckoutContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
	}

	let summary = <Redirect to='/' />;

	if (ReduxIngs) {

		const purchasedRedirect = ReduxPurchased ? <Redirect to='/' /> : null;

		summary =( 
				<div>
					{purchasedRedirect}
					<CheckoutSummary 
						ingredients={ReduxIngs} 
						CheckoutCancel={CheckoutCancelHandler} 
						CheckoutContinue={CheckoutContinueHandler}
					/>
					<Route 
						path={props.match.path + '/contact-data'} 
						component={ContactData}
						//render={(props) => (<ContactData ingredients={props.ReduxIngs} price={props.ReduxTotPrice} {...props}/>)} 
					/>
				</div>
				) // let summary
	}
	return summary;
}


export default /*withRouter(*/Checkout/*)*/;