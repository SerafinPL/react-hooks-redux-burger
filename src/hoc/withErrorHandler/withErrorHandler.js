

import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        UNSAFE_componentWillMount () { // was a componentWillMount
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;






// import React, {useEffect, useState}from 'react';
// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux/Aux';




// const withErrorHandler = (WrappedComponent, axios) => {
// 	return (props) => {

// 		const [errorState, useErrorState] = useState(0);

// 		useEffect(() => {
// 			const reqInterceptor = axios.interceptors.request.use(req => {
// 				useErrorState(null);
// 				return req;
// 			});
// 			const resInterceptor = axios.interceptors.response.use(res => res, error => {
// 				useErrorState(error);
// 				console.log('error', error.message, 'hokk', errorState );
// 			});

// 			console.log('useEffect', reqInterceptor, resInterceptor );
// 			console.log( 'hokk', errorState );
// 			return () => {
// 				console.log('useEffect Return', reqInterceptor, resInterceptor );
// 				axios.interceptors.request.eject(reqInterceptor);
// 				axios.interceptors.response.eject(resInterceptor);
// 				console.log('useEffect Return2', reqInterceptor, resInterceptor );
// 			};

// 		});

// 		const showing = errorState ? true : false;

// 		const ErrorConfirmedHandler = () => {
// 			useErrorState(false);
// 		}
		
// 		return(
// 			<Aux>
// 				<Modal 	show={showing}
// 						modalClosed={ErrorConfirmedHandler}
// 				>
// 					{showing ? errorState.message : null}
// 				</Modal>
// 				<WrappedComponent {...props} />
// 			</Aux>
// 		);
// 	}
// }

// export default withErrorHandler;