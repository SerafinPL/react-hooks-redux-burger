import React, { useState, useEffect} from 'react';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/acIndex';



const BurgerBuilder = (props) => {
	
	useEffect(() =>{	
		if (!props.ReduxWasBuild){
			props.ReduxSetIngredients();
		}
	},[]); // like componentDidMount
	// componentDidMount() {
	// 		this.props.ReduxSetIngredients();
		// axios.get('/ingredients.json')
		// .then(response => {
		// 		this.setState({ingredients: response.data});

		// 		let ingrARR = Object.keys(this.state.ingredients);
		// 		let price = this.state.totalPrice;
		// 		ingrARR.map(val =>{
					
		// 			price += this.state.ingredients[val] * INGREDIENT_PRICES[val];

		// 		})

		// 		// let price = this.state.ingredients.salad * INGREDIENT_PRICES.salad +
		// 		// 		this.state.ingredients.cheese * INGREDIENT_PRICES.cheese +
		// 		// 		this.state.ingredients.meat * INGREDIENT_PRICES.meat +
		// 		// 		this.state.ingredients.bacon * INGREDIENT_PRICES.bacon + this.state.totalPrice;
		// 		this.setState({totalPrice: price});
		// 		this.setState({purchasable: price > 4});

		// })
		// .catch(error => {
		// 	this.setState({error: true});
		// });
	//} //componentDidMount()

	// state = {
	// 	purchasing: false,
	// 	//ingredients: null,
	// 	//totalPrice: 4,
	// 	//purchasable: false,
		
	// 	//loading: false,
	// 	//error: false
	// }
	const [purchasing, purchasingSet] = useState(false);

	const updatePurchaseState = (ingredients) => {
		
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey]
					}).reduce( (summ, el)=> {
						return summ + el;
					}, 0);
		return (sum > 0) ;

	}

	const purchaseHandler = () => {
		let pur = false;
		if (props.ReduxIsAuth){
			pur = true;
			//this.setState({purchasing: true});	
		} else {
			props.ReduxChangePath('/checkout');
			props.history.push('/auth');
		}
		purchasingSet(pur);
	}

	const purchaseCancelHandler = () => {
		//this.setState({purchasing: false});
		purchasingSet(false);
	}

	
	const continueHandler = () => {
		props.ReduxOnInitPurchase();
		props.history.push('/checkout');

	}

	//render(){

		const disabledInfo = {
			...props.ReduxIngs
		};

		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null; 

		let burger = props.ReduxError ? <p style={{textAlign: 'center'}}>Składników nie da się załadować</p> : <Spinner />

		if (props.ReduxIngs){
	

			burger =(
				<Aux>
					<Burger ingredients={props.ReduxIngs}/>
						<BuildControls 
							ingredientAdded={props.ReduxOnIgredientAdded}
							ingredientRemove={props.ReduxOnIgredientRemoved}
							disabled={disabledInfo}
							purchasable={updatePurchaseState(/*this.*/props.ReduxIngs)}
							isAuth={props.ReduxIsAuth}
							price={props.ReduxTotPrice}
							ordered={purchaseHandler}
						/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={props.ReduxIngs}
							purchaseCanceled={purchaseCancelHandler}
							purchaseContinue={continueHandler}
							price={props.ReduxTotPrice}
						/>;

				
		}
		 // if (this.state.loading) {
		 // 	orderSummary = <Spinner />
		 // }
		

		return(
				<Aux>
					<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
						{orderSummary}
					</Modal>
					{burger}
				</Aux>
			);
	//}
}

const mapStateToProps = state => {
	return{
		ReduxIngs: state.burgerBuilder.ingredients,
		ReduxTotPrice: state.burgerBuilder.totalPrice,
		ReduxError: state.burgerBuilder.error,
		ReduxIsAuth: state.auth.token !== null,
		ReduxWasBuild: state.burgerBuilder.itWasBuild

	};
};

const mapDispachToProps = dispatch => {
	return{
		
		ReduxOnIgredientAdded: (ingName) => dispatch( actionCreators.addIngerdient(ingName) ),
		//{type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		ReduxOnIgredientRemoved: (ingName) => dispatch( actionCreators.removeIngerdient(ingName) ),
		//{type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
		ReduxSetIngredients: () => dispatch( actionCreators.initIngridients() ),
		ReduxOnInitPurchase: () => dispatch( actionCreators.purchaseInit() ),
		ReduxChangePath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
	};
};


export default connect(mapStateToProps, mapDispachToProps)( withErrorHandler(BurgerBuilder, axios) );