import React, {useState} from 'react';

import {connect} from 'react-redux';

import classes from './Layout.module.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
	
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
				isAuth={props.ReduxIsAuth}
				drawerToggleClicked={sideDrawerToggleHandler}/*opened={this.sideDrawerOpenedHandler}*/
			/>
			<SideDrawer 
				isAuth={props.ReduxIsAuth}
				open={showSideDrawer} 
				closed={sideDrawerClosedHandler}
			/>
			<main className={classes.content}>
				{props.children}
			</main>
		</Aux>
	)
	
};

const mapStateToProps = (state) => {
	return{
		ReduxIsAuth: state.auth.token !== null,
	};
};


export default connect(mapStateToProps)(Layout);