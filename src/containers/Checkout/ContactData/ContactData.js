import React, {useState} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
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
		});//orderFormState
		
		const [formIsValid, setFormIsValid] = useState(false);

	

	const orderHandler = (event) => {
		event.preventDefault();
			//this.setState({loading: true});
			
			const dataForm = {};
			for (let formElementId in orderForm){
				dataForm[formElementId] = orderForm[formElementId].value;
			}
			

			const order = {
				ingredients: props.ReduxIngs,
				price: props.ReduxTotPrice,
				orderData: dataForm,
				userId: props.ReduxUserId
				
			}
			props.onOrderBurger(order, props.ReduxToken);
			props.ReduxSetIngredients();
			// axios.post('/orders.json', order)
			// 	.then(response => {
			// 		this.setState({loading: false});
			// 		this.props.history.push('/');
			// 	} )
			// 	.catch(error => {
			// 		this.setState({loading: false});
			// 	} );
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

	if (props.ReduxLoading){
		form = (<Spinner/>);
	}

	return(
			<div className={classes.ContactData}>
				<h4>Wprowadź dane do zamówienia:</h4>
			
				{form}
			</div>
		);
	
}
	
const mapStateToProps = state => {
	return{
		ReduxIngs: state.burgerBuilder.ingredients,
		ReduxTotPrice: state.burgerBuilder.totalPrice,
		ReduxLoading: state.order.loading,
		ReduxToken: state.auth.token,
		ReduxUserId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onOrderBurger: (orderData, token) => dispatch( actionCreators.purchaseBurgerStart(orderData, token) ),
		ReduxSetIngredients: () => dispatch( actionCreators.initIngridients() ),
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));