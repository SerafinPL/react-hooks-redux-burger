import React, {useState} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {useSelector, useDispatch} from 'react-redux';
import * as actionCreators from '../../../store/actions/acIndex';

import {updateObject, checkValidtity} from '../../../shared/utility';

//class ContactData extends Component {
const ContactData = props => {
	const [orderForm, setOrderForm] = useState({
			name: {
				elementType: 'input',
				label: 'Nazwa',
				elementConfig: {
					type: 'text',
					placeholder: 'Twoje Imię'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				label: 'Ulica',
				elementConfig: {
					type: 'text',
					placeholder: 'Ulica'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				label: 'Kod pocztowy',
				elementConfig: {
					type: 'text',
					placeholder: 'Kod-pocztowy'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			city: {
				elementType: 'input',
				label: 'Miasto',
				elementConfig: {
					type: 'text',
					placeholder: 'Miasto'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				label: 'Kraj',
				elementConfig: {
					type: 'text',
					placeholder: 'Kraj'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				label: 'E-mail',
				elementConfig: {
					type: 'email',
					placeholder: 'Twój Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				label: 'Rodzaj Dostawy',
				elementConfig:{
					options: [
						{value: 'fastest', displayValue:'Najszybciej'},
						{value: 'chipest', displayValue:'Najtaniej'}
					]
				} ,
				value: 'fastest',
				validation: {},
				valid: true,
				
			}
		});//orderForm
		
		const [formIsValid, setFormIsValid] = useState(false);

		const dispatch = useDispatch();

		const onOrderBurger = (orderData, token) => dispatch( actionCreators.purchaseBurgerStart(orderData, token) );
		const ReduxSetIngredients = () => dispatch( actionCreators.initIngridients() );

		const ReduxIngs = useSelector(state => state.burgerBuilder.ingredients);
		const ReduxTotPrice = useSelector(state => state.burgerBuilder.totalPrice);
		const ReduxLoading = useSelector(state => state.order.loading);
		const ReduxToken = useSelector(state => state.auth.token);
		const ReduxUserId = useSelector(state => state.auth.userId);

	

	const orderHandler = (event) => {
		event.preventDefault();
						
		const dataForm = {};
		for (let formElementId in orderForm){
			dataForm[formElementId] = orderForm[formElementId].value;
		}
		

		const order = {
			ingredients: ReduxIngs,
			price: ReduxTotPrice,
			orderData: dataForm,
			userId: ReduxUserId
			
		}
		onOrderBurger(order, ReduxToken);
		ReduxSetIngredients();
	}

	

	const inputChangeHandler = (event, id) => {
		
		 // wewnętrzne obiekty są wskaźnikami trzeba klonować dalej
		 const updatedFormElement = updateObject(orderForm[id], {
		 	value: event.target.value,
		 	valid: checkValidtity(event.target.value, orderForm[id].validation),
		 	touched: true
		 });

		const updatedOrderForm = updateObject(orderForm, {
			[id]: updatedFormElement
		});
		

		let formIsValid = true;
		for (let indetifier in updatedOrderForm){
			formIsValid = (updatedOrderForm[indetifier].valid && formIsValid);
				
		}
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);

	}

	const formElementArr = [];
	for (let key in orderForm){
		formElementArr.push({
			id: key,
			config: orderForm[key]
		});
	}

	let form = (
		
			<form onSubmit={orderHandler}>
				
				{formElementArr.map(formElement => (
						<Input 
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={(event) => inputChangeHandler(event, formElement.id)}
							label={formElement.config.label}

						/>
					))
				}
				
				<Button btnType="Success" disabled={!formIsValid}>Zamów</Button>
			</form>
				);

	if (ReduxLoading){
		form = (<Spinner/>);
	}

	return(
			<div className={classes.ContactData}>
				<h4>Wprowadź dane do zamówienia:</h4>
			
				{form}
			</div>
		);
	
}
	
export default withErrorHandler(ContactData, axios);