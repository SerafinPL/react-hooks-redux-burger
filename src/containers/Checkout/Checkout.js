import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect,withRouter} from 'react-router-dom';

import { connect } from 'react-redux';



const Checkout = (props) => {

	

	const CheckoutCancelHandler = () => {
		props.history.goBack();
	}

	const CheckoutContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
	}

	let summary = <Redirect to='/' />;

	if (props.ReduxIngs) {

		const purchasedRedirect = props.ReduxPurchased ? <Redirect to='/' /> : null;

		summary =( 
				<div>
					{purchasedRedirect}
					<CheckoutSummary 
						ingredients={props.ReduxIngs} 
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

const mapStateToProps = state => {
	return{
		ReduxIngs: state.burgerBuilder.ingredients,
		ReduxPurchased: state.order.purchased
		
	};
};




export default withRouter(connect(mapStateToProps)(Checkout));