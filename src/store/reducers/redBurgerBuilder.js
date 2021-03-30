
import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {

		ingredients: null,//{
		// 	// salad: 	0,
		// 	// cheese: 0,
		// 	// meat: 	0,
		// 	// bacon: 	0
		// },
		totalPrice: 4,
		error: false,
		itWasBuild: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const addIngredient = (state, action) => {
	const updatedIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
	const updatedIngredients = updateObject(state.ingredients, updatedIngr);
	const updatedState ={
		ingredients : updatedIngredients, 
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		itWasBuild: true
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const updated_Ingr = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
	const updated_Ingredients = updateObject(state.ingredients, updated_Ingr);
	const updated_State ={
		ingredients : updated_Ingredients, 
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		itWasBuild: true
	};
	return updateObject(state, updated_State);
};

const setIngredients = (state, action) => {
	let ingrARR = Object.keys(action.ing);
		let price = 4;
		ingrARR.map(val =>{
			
			price += action.ing[val] * INGREDIENT_PRICES[val];
			return true;
		}) 
	return updateObject(state, {
		ingredients: {
			salad: action.ing.salad,
			bacon: action.ing.bacon,
			cheese: action.ing.cheese,
			meat: action.ing.meat
		},
		error: false,
		totalPrice: price,
		itWasBuild: false
	});
};



const reducer = (state = initialState, action) => {

	switch (action.type){
		case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
			// return{
			// 	...state,
			// 	ingredients: {
			// 		...state.ingredients,
			// 		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			// 	},
			// 	totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			// };

		case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
			// return{
			// 	...state,
			// 	ingredients: {
			// 		...state.ingredients,
			// 		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
			// 	},
			// 	totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			// };

		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
			// return{
			// 	...state,
			// 	//ingredients: action.ing, // kolejność z serwera
			// 	// własna kolejność
			// 	ingredients: {
			// 		salad: action.ing.salad,
			// 		bacon: action.ing.bacon,
			// 		cheese: action.ing.cheese,
			// 		meat: action.ing.meat
			// 	},
			// 	error: false,
			// 	totalPrice: price
			// };

		case actionTypes.FETCH_INGREDIENTS_FAIL: return updateObject(state, { error: true });
			// return{
			// 	...state,
			// 	error: true
			// }

		default: 
		return state;
		
	};//switch
	
};

export default reducer;