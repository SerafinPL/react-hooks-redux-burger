import React, {useState} from 'react';

import {useSelector} from 'react-redux';

import classes from './Layout.module.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

	const ReduxIsAuth = useSelector(state => state.auth.token !== null);
	
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () =>{
		setShowSideDrawer(false);
	}

	const sideDrawerToggleHandler = () =>{
	 	setShowSideDrawer( !showSideDrawer );
	}

	return(
		<Aux>
			<Toolbar 
				isAuth={ReduxIsAuth}
				drawerToggleClicked={sideDrawerToggleHandler}/*opened={this.sideDrawerOpenedHandler}*/
			/>
			<SideDrawer 
				isAuth={ReduxIsAuth}
				open={showSideDrawer} 
				closed={sideDrawerClosedHandler}
			/>
			<main className={classes.content}>
				{props.children}
			</main>
		</Aux>
	)
	
};


export default Layout;