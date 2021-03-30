import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
	{ label: 'Sałata', type: 'salad'},
	{ label: 'Bekon', type: 'bacon'},
	{ label: 'Ser', type: 'cheese'},
	{ label: 'Mięso', type: 'meat'},
];

const bulidControls = (props) => (

		<div className={classes.BuildControls}>
			<p>Aktulana Cena: <strong>{props.price.toFixed(2)}</strong> zł</p>
			{controls.map(	ctrl => (
							<BuildControl 
								key={ctrl.label} 
								label={ctrl.label}
								type={ctrl.type}
								added={() => props.ingredientAdded(ctrl.type)}
								removed={() => props.ingredientRemove(ctrl.type)}
								disabled={props.disabled[ctrl.type]}
							/>
						)

				)}
			<button 
				className={classes.OrderButton} 
				disabled={ !props.purchasable}
				onClick={props.ordered}>
				{props.isAuth ? 'ZAMÓW' : 'ZALOGUJ ABY ZAMÓWIĆ'}
			</button>
		</div>

	);

export default bulidControls;