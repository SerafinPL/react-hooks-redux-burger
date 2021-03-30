import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>Zamawiamy burgera</h1>
			<div className='classes.burger'>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				btnType='Danger'
				clicked={props.CheckoutCancel}>ANULUJ</Button>
			<Button 
				btnType='Success'
				clicked={props.CheckoutContinue}>KONTYNUUJ</Button>
		</div>

		);
}

export default CheckoutSummary;