import React, {Component} from 'react';

import {connect} from 'react-redux';

import classes from './Layout.module.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	

	state ={
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () =>{
		this.setState({showSideDrawer: false})
	}

	// sideDrawerOpenedHandler = () =>{
	// 	this.setState({showSideDrawer: true})
	// }

	 sideDrawerToggleHandler = () =>{
	 	this.setState( (prevState) => {
	 		return {showSideDrawer: !prevState.showSideDrawer}
	 	})
	 }

	render(){
		return(
		<Aux>
			<Toolbar 
				isAuth={this.props.ReduxIsAuth}
				drawerToggleClicked={this.sideDrawerToggleHandler}/*opened={this.sideDrawerOpenedHandler}*/
			/>
			<SideDrawer 
				isAuth={this.props.ReduxIsAuth}
				open={this.state.showSideDrawer} 
				closed={this.sideDrawerClosedHandler}
			/>
			<main className={classes.content}>
				{this.props.children}
			</main>
		</Aux>
		)
	}
};

const mapStateToProps = (state) => {
	return{
		ReduxIsAuth: state.auth.token !== null,
	};
};


export default connect(mapStateToProps)(Layout);