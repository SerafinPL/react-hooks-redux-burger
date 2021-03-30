import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';


const navigationItems = (props) => (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/' exact>Stwórz Burgera</NavigationItem>
			{props.isAuthenticated ? <NavigationItem link='/orders'>Zamówienia</NavigationItem> : null}
			{props.isAuthenticated 
				? <NavigationItem link='/logout'>Wyloguj</NavigationItem>
				: <NavigationItem link='/auth'>Zaloguj / Zarejestruj</NavigationItem>}
			


		</ul>
	);


export default navigationItems;

