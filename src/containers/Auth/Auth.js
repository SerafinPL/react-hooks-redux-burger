import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/acIndex';
import {connect} from 'react-redux';

import {Redirect} from 'react-router-dom';

import { updateObject, checkValidtity } from '../../shared/utility';

class Auth extends Component {

	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Adres e-mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Hasło'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}, // controls:
		isSignup: true
	}

	componentDidMount() {
		if (!this.props.redBurgerWasBuild && this.props.redPathToRedirect !== '/') {
			this.props.ReduxSetAuthRedirectPath();
		}
	}

	

	inputChangeHandler = (event, controlName) => {
		
		// const updatedControls = {
		// 	...this.state.controls,
		// 	[controlName]: {
		// 		...this.state.controls[controlName],
		// 		value: event.target.value,
		// 		valid: this.checkValidtity(event.target.value, this.state.controls[controlName].validation),
		// 		touched: true
		// 	}

		// }; 

		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName],{
			
				value: event.target.value,
				valid: checkValidtity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			})
		})

		// wewnętrzne obiekty są wskaźnikami trzeba klonować dalej
		// let formIsValid = true;
		// for (let indetifier in updatedControls){
		// 	formIsValid = (updatedControls[indetifier].valid && formIsValid);
		// }
		this.setState({controls: updatedControls/*, formIsValid: formIsValid*/});
		
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);


	}

	switchAuthMod = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup}
		});
	}

	render (){

		const formElementArr = [];
		for (let key in this.state.controls){
			formElementArr.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = formElementArr.map(formElement => (
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangeHandler(event, formElement.id)}
				label={formElement.config.elementConfig.type === 'email' ? 'E-mail' : 'Hasło'}
			/>

		));

		let authRedirect = null;
		if (this.props.redAuth){
			authRedirect = <Redirect to={this.props.redPathToRedirect} />;
		};

		if (this.props.redLoading) {
			form = <Spinner/>;
		};

		let errorMessage = null;
		if (this.props.redError) {
			if (this.props.redError.response){

				switch (this.props.redError.response.data.error.message ) {
					case 'EMAIL_NOT_FOUND': errorMessage = <p>E-mail nie odnaleziony</p>;
					break;
					case 'INVALID_PASSWORD': errorMessage = <p>Błędne hasło</p>;
					break;
					case 'EMAIL_EXISTS': errorMessage = <p>Jest już konto na podany mail</p>;
					break;
					default: errorMessage = <p>{this.props.redError.response.data.error.message}</p>; 
				}//switch

			} else {
				errorMessage = <p>{this.props.redError.message}</p>;	
			};
			
		};

		return(
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={(event) => this.submitHandler(event)}>
					{form}
					
					<Button btnType='Success'>{this.state.isSignup ? 'ZAREJESTRUJ' : 'ZALOGUJ'}</Button>
				</form>
				<Button 
					btnType='Danger'
					clicked={this.switchAuthMod}>
						Zmień na {this.state.isSignup ? 'Zaloguj' : 'Zarejestruj'}
				</Button>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		redLoading: state.auth.loading,
		redError: state.auth.error,
		redAuth: state.auth.token !== null,
		redPathToRedirect: state.auth.pathToRedirect,
		redBurgerWasBuild: state.burgerBuilder.itWasBuild,
		
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		ReduxSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);