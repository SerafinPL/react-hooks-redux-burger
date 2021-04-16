import React, { useEffect, Suspense, useCallback} from 'react' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';



import { useSelector, useDispatch} from 'react-redux';
import * as actions from './store/actions/acIndex';

import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy( () => import('./containers/Auth/Auth') );
const OrdersPage = React.lazy( () => import('./containers/OrdersPage/OrdersPage') );
const Checkout = React.lazy( () => import('./containers/Checkout/Checkout') );
const Logout = React.lazy( () => import('./containers/Auth/Logout/Logout') );

const App = (props) => {

	const RedAuth = useSelector(state => state.auth.token !== null); 

	const dispatch = useDispatch();

	const authCheckState = useCallback(() => dispatch(actions.authCheckState()) ,[dispatch]);

	//const [testState, setTestState] = useState(true);

	

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

	if (RedAuth) {
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


export default /*withRouter(*/App/*)*/; // withRouter for route problems with connect
