import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';


export const addIngerdient = (ingName) => {
	return{
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	}
}

export const removeIngerdient = (ingName) => {
	return{
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	}
}

export const initIngridients = () => {

	return dispatch => {
		axios.get('/ingredients.json')
		.then(response => {
			dispatch( setIngredients(response.data) );
		}).catch(error => {
			dispatch(fetchIngredientsFali());
		});
	}
};

export const fetchIngredientsFali = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAIL
	};
};
	

export const setIngredients = (ingr) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ing: ingr
	};
	
};
