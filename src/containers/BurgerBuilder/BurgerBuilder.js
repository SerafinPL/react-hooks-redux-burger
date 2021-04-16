import React, { useState, useEffect, useCallback} from 'react';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {useDispatch, useSelector } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/acIndex';



const BurgerBuilder = props => {
	

	const dispatch = useDispatch();

	const 	ReduxOnIgredientAdded = (ingName) => dispatch( actionCreators.addIngerdient(ingName) );
	const	ReduxOnIgredientRemoved = (ingName) => dispatch( actionCreators.removeIngerdient(ingName) );
	const 	ReduxSetIngredients = useCallback(() => dispatch( actionCreators.initIngridients() ),[dispatch]);
	const	ReduxOnInitPurchase = () => dispatch( actionCreators.purchaseInit() );
	const	ReduxChangePath = (path) => dispatch( actionCreators.setAuthRedirectPath(path) );

	const ReduxIngs = useSelector(state => {
		return state.burgerBuilder.ingredients
	});
	const ReduxTotPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const ReduxError = useSelector(state => state.burgerBuilder.error);
	const ReduxIsAuth = useSelector(state => state.auth.token !== null);
	const ReduxWasBuild = useSelector(state => state.burgerBuilder.itWasBuild);

	
	useEffect(() =>{	
		if (!ReduxWasBuild){
			ReduxSetIngredients();
		}
	},[ReduxWasBuild, ReduxSetIngredients]); // like componentDidMount
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
		
		if (ReduxIsAuth){
			purchasingSet(true);
				
		} else {
			ReduxChangePath('/checkout');
			props.history.push('/auth');
		}
		
	}

	const purchaseCancelHandler = () => {
		
		purchasingSet(false);
	}

	
	const continueHandler = () => {
		ReduxOnInitPurchase();
		props.history.push('/checkout');

	}

	//render(){

		const disabledInfo = {
			...ReduxIngs
		};

		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null; 

		let burger = ReduxError ? <p style={{textAlign: 'center'}}>Składników nie da się załadować</p> : <Spinner />

		if (ReduxIngs){
	

			burger =(
				<Aux>
					<Burger ingredients={ReduxIngs}/>
						<BuildControls 
							ingredientAdded={ReduxOnIgredientAdded}
							ingredientRemove={ReduxOnIgredientRemoved}
							disabled={disabledInfo}
							purchasable={updatePurchaseState(ReduxIngs)}
							isAuth={ReduxIsAuth}
							price={ReduxTotPrice}
							ordered={purchaseHandler}
						/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={ReduxIngs}
							purchaseCanceled={purchaseCancelHandler}
							purchaseContinue={continueHandler}
							price={ReduxTotPrice}
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




export default withErrorHandler(BurgerBuilder, axios) ;