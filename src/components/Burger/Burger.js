import React from 'react';

import {withRouter} from 'react-router-dom';


import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
		
	
		let transformedIngredients = 
		Object.keys(props.ingredients)/*tworzy tablice nazw elemtów obiektu*/.map(
				igKey => {	//Array tworzy pod tablice z ilością elementów
					return [...Array(props.ingredients[igKey])].map((_, index) => {
						return <BurgerIngredient key={igKey + index} type={igKey}/>;
					});
				}
			).reduce((arr, el) => { // spłaszczenie tablicy do jednej
					return arr.concat(el)
			}, []);

		if(transformedIngredients.length === 0 ){
			transformedIngredients = <p>Proszę dodać składniki</p>
		}
	return(
			<div className={classes.Burger}>
				<BurgerIngredient type='bread-top'/>
				{transformedIngredients}
				<BurgerIngredient type='bread-bottom'/>
			</div>
		);
}

export default withRouter(burger);