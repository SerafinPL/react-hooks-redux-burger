import React, {useState, useEffect, useCallback} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/acIndex';
import {useSelector, useDispatch} from 'react-redux';

import {Redirect} from 'react-router-dom';

import { updateObject, checkValidtity } from '../../shared/utility';

//class Auth extends Component {
const Auth = props => {


	const dispatch = useDispatch();

	const onAuth = (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup));
	const ReduxSetAuthRedirectPath = useCallback( () => dispatch(actions.setAuthRedirectPath('/')) ,[dispatch]);

	const redLoading = useSelector(state => state.auth.loading);
	const redError = useSelector(state => state.auth.error);
	const redAuth = useSelector(state => state.auth.token !== null);
	const redPathToRedirect = useSelector(state => state.auth.pathToRedirect);
	const redBurgerWasBuild = useSelector(state => state.burgerBuilder.itWasBuild);
	
	const [controls, setControls] = useState({
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
	}); // controls:
	const [isSignup, setIsSignup] = useState(true);

	useEffect(() => {
		if (!redBurgerWasBuild && redPathToRedirect !== '/') {
	 		ReduxSetAuthRedirectPath();
	 	}
	 	
	}, [redBurgerWasBuild, redPathToRedirect, ReduxSetAuthRedirectPath]);
	// componentDidMount() {
	// 	if (!this.props.redBurgerWasBuild && this.props.redPathToRedirect !== '/') {
	// 		this.props.ReduxSetAuthRedirectPath();
	// 	}
	// }

	

	const inputChangeHandler = (event, controlName) => {
		
		// const updatedControls = {
		// 	...this.state.controls,
		// 	[controlName]: {
		// 		...this.state.controls[controlName],
		// 		value: event.target.value,
		// 		valid: this.checkValidtity(event.target.value, this.state.controls[controlName].validation),
		// 		touched: true
		// 	}

		// }; 

		const updatedControls = updateObject(controls, {
			[controlName]: updateObject(controls[controlName],{
			
				value: event.target.value,
				valid: checkValidtity(event.target.value, controls[controlName].validation),
				touched: true
			})
		});

		// wewnętrzne obiekty są wskaźnikami trzeba klonować dalej
		// let formIsValid = true;
		// for (let indetifier in updatedControls){
		// 	formIsValid = (updatedControls[indetifier].valid && formIsValid);
		// }

		//this.setState({controls: updatedControls/*, formIsValid: formIsValid*/});
		setControls(updatedControls);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		onAuth(controls.email.value, controls.password.value, isSignup);


	}

	const switchAuthMod = () => {
		setIsSignup(!isSignup)
		// this.setState(prevState => {
		// 	return {isSignup: !prevState.isSignup}
		// });
	}



	const formElementArr = [];
	for (let key in controls){
		formElementArr.push({
			id: key,
			config: controls[key]
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
			changed={(event) => inputChangeHandler(event, formElement.id)}
			label={formElement.config.elementConfig.type === 'email' ? 'E-mail' : 'Hasło'}
		/>

	));

	let authRedirect = null;
	if (redAuth){
		authRedirect = <Redirect to={props.redPathToRedirect} />;
	};

	if (redLoading) {
		form = <Spinner/>;
	};

	let errorMessage = null;
	if (redError) {
		if (redError.response){

			switch (redError.response.data.error.message ) {
				case 'EMAIL_NOT_FOUND': errorMessage = <p>E-mail nie odnaleziony</p>;
				break;
				case 'INVALID_PASSWORD': errorMessage = <p>Błędne hasło</p>;
				break;
				case 'EMAIL_EXISTS': errorMessage = <p>Jest już konto na podany mail</p>;
				break;
				default: errorMessage = <p>{redError.response.data.error.message}</p>; 
			}//switch

		} else {
			errorMessage = <p>{redError.message}</p>;	
		};
		
	};

	return(
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={(event) => submitHandler(event)}>
				{form}
				
				<Button btnType='Success'>{isSignup ? 'ZAREJESTRUJ' : 'ZALOGUJ'}</Button>
			</form>
			<Button 
				btnType='Danger'
				clicked={switchAuthMod}>
					Zmień na {isSignup ? 'Zaloguj' : 'Zarejestruj'}
			</Button>
		</div>
	);
	
};



export default Auth;