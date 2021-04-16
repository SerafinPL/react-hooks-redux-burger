import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

//class OrderSummary extends Component {
const OrderSummary = props => {
	


	const controls = [
					{ label: 'Sałata', type: 'salad'},
					{ label: 'Bekon', type: 'bacon'},
					{ label: 'Ser', type: 'cheese'},
					{ label: 'Mięso', type: 'meat'},
				];

	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
				const aIndex = controls.findIndex(value =>{
					return (igKey === value.type);
				});

			return(				
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{controls.[aIndex].label}</span>: {props.ingredients[igKey]}
				</li>
			)
		});


	return (
		<Aux>
			<h3>Twoje zamówinie</h3>
			<p>Przepyszny Burger z poniższymi składnikami</p>
			<ul> 
				{ingredientSummary}
			</ul>
			<p><strong>Cena Burgera: {props.price.toFixed(2)} zł</strong></p>
			<p>Chcesz złożyć zamówienie?</p>
			<Button btnType='Danger' clicked={props.purchaseCanceled}>ANULUJ</Button>
			<Button btnType='Success' clicked={props.purchaseContinue} >KONTYNUUJ</Button>
		</Aux>
	);
	
};

export default OrderSummary;