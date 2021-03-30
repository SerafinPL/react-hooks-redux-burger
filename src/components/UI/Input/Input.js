import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

	let inputElement = null;

	const inputClasses = [classes.InputElement]

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType){
		case('input'):
			inputElement = <input 
						className={inputClasses.join(' ')} 
						onChange={props.changed}
						{...props.elementConfig} 
						value={props.value}/>;
		break;
		case('textarea'):
			inputElement = <textarea 
						className={inputClasses.join(' ')} 
						onChange={props.changed}
						{...props.elementConfig} 
						value={props.value}/>;
		break;
		case('select'):
			inputElement = (<select 
								className={inputClasses.join(' ')} 
								onChange={props.changed}
								
								value={props.value}>
								{props.elementConfig.options.map(option => (
									<option key={option.value} value={option.value}>
										{option.displayValue}
									</option>
									)
								)}
								
							</select>);
		break;
		default:
			inputElement = <input 
						className={inputClasses.join(' ')} 
						onChange={props.changed}
						{...props.elementConfig} 
						value={props.value}/>;
	} // switch

		let validationErrorMessage = null;
		if (props.invalid && props.touched) {
			validationErrorMessage = <p className={classes.Error}>Wprowadź poprawne dane warość {props.elementConfig.type === 'password' ? 'hasła' : props.value} jest nieprawidłowa</p>
		}

		return(
			<div className={classes.Input}>
				<label className={classes.Label}>{props.label}</label>
				{validationErrorMessage}
				{inputElement}
				
			</div>
		);
	};


export default Input;