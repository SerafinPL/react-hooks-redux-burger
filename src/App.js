import React, { useEffect, Suspense} from 'react' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';



import {connect} from 'react-redux';
import * as actions from './store/actions/acIndex';

import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy( () => import('./containers/Auth/Auth') );
const OrdersPage = React.lazy( () => import('./containers/OrdersPage/OrdersPage') );
const Checkout = React.lazy( () => import('./containers/Checkout/Checkout') );
const Logout = React.lazy( () => import('./containers/Auth/Logout/Logout') );

const App = (props) => {

	//const [testState, setTestState] = useState(true);

	const {authCheckState, RedAuth} = props;

	useEffect(() =>{	//it is componentDidMount
		if (!RedAuth) {
			authCheckState();
		}
		// setTimeout(() => {
		// 	setTestState(false)
		// },5000);
		//return () => {} //componentWillUnmount
		
	}, [authCheckState, RedAuth]);  

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
					// render={(props) => (
					// 		<Suspense fallback={<Spinner/>}>
					// 			<OrdersPage {...props}/>
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
