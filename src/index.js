import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/redBurgerBuilder';
import orderReducer from './store/reducers/redOrder';
import authReducer from './store/reducers/redAuth';
import thunk from 'redux-thunk';
							// REDUX DEV TOOLS ONLY FOR DEVELOPMENT MODE
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
						
const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth : authReducer
});

const storeBox = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ));


ReactDOM.render(
  <Provider store={storeBox}>
  	
    	<App />
    
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
