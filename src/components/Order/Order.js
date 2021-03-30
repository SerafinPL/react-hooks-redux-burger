import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {

	const ingredients = [];
	const controls = [
						{ label: 'sałata', type: 'salad'},
						{ label: 'bekon', type: 'bacon'},
						{ label: 'ser', type: 'cheese'},
						{ label: 'mięso', type: 'meat'},
					];
		
		for (let ingredientName in props.ingredients){
			ingredients.push({
				name: ingredientName, 
				amount: props.ingredients[ingredientName]

			});
		}
	const ingredientsOutput = ingredients.map(igValue => {

		const aIndex = controls.findIndex(value =>{
						return (igValue.name === value.type);
					});


		return( 
				<span 
					key={igValue.name} 
					style={{
						textTransform: 'capitalize',
						display: 'inline-block',
						padding: '5px',
						margin: '0 8px',
						border: '1px solid #eee'
					}}
				>
					{controls[aIndex].label} ({igValue.amount})    
				</span>
			);
	})

	return(
			<div className={classes.Order}>
				<p>Składniki:</p>  

				{ingredientsOutput}
				
				<p>Cena: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong> zł</p>
			</div>
		);

}

export default Order;