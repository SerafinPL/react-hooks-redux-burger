import React, { useState, useEffect, Suspense} from 'react' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import {Route, BrowserRouter, Switch, withRouter, Redirect} from 'react-router-dom';



import {connect} from 'react-redux';
import * as actions from './store/actions/acIndex';

import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy( () => import('./containers/Auth/Auth') );
const OrdersPage = React.lazy( () => import('./containers/OrdersPage/OrdersPage') );
const Checkout = React.lazy( () => import('./containers/Checkout/Checkout') );
const Logout = React.lazy( () => import('./containers/Auth/Logout/Logout') );

const App = (props) => {

	//const [testState, setTestState] = useState(true);

	useEffect(() =>{	//it is componentDidMount
		if (!props.RedAuth) {
			props.authCheckState();
		}
		// setTimeout(() => {
		// 	setTestState(false)
		// },5000);
		//return () => {} //componentWillUnmount
	}, []);  

	let route = (
			<Switch>
				<Route path='/auth' //component={Auth} 
					render={() => (
							<Suspense fallback={<Spinner/>}>
								<Auth/>
							</Suspense>	
						)}
				/>
	        	<Route path='/' exact component={BurgerBuilder} />
	        	<Redirect to='/' />
	        	
	        </Switch>
		);

	if (props.RedAuth) {
		route = (
		<Suspense fallback={<Spinner/>}>
			<Switch>
				
				<Route path='/orders' exact component={OrdersPage} 
					// render={() => (
					// 		<Suspense fallback={<Spinner/>}>
					// 			<OrdersPage/>
					// 		</Suspense>
					// 	)}
				/>

	        	<Route path='/checkout' component={Checkout} 
	     //    		render={() => (
						// 	<Suspense fallback={<Spinner/>}>
						// 		<Checkout/>
						// 	</Suspense>
						// )}
	        	/>
	        	<Route path='/logout' component={Logout} 
	        		// render={() => (
	        		// 		<Suspense fallback={<Spinner/>}>
	        		// 			<Logout/>
	        		// 		</Suspense>
	        		// 	)}

	        	/>
	        	
	        	<Route path='/auth' component={Auth} 
					// render={
					// 	() => (
					// 		<Suspense fallback={<Spinner/>}>
					// 			<Auth/>
					// 		</Suspense>	
					// 	)}
				/>
	        	<Route path='/' component={BurgerBuilder} />
	        	<Redirect to='/' />
	        </Switch>
	    </Suspense>
		);
	}

  return (
    <div >
      	<BrowserRouter>
	      	<Layout>
      		  	{route}
	        </Layout>
        </BrowserRouter>
      
    </div>
  );
}

const mapStateToProps = state => {
	return{
		RedAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return{
		authCheckState: () => dispatch(actions.authCheckState()),

	};
};
export default /*withRouter(*/connect(mapStateToProps, mapDispatchToProps)(App)/*)*/; // withRouter for route problems with connect
