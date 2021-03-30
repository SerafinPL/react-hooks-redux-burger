

// import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux/Aux';

// const withErrorHandler = ( WrappedComponent, axios ) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         UNSAFE_componentWillMount () { // was a componentWillMount
//             this.reqInterceptor = axios.interceptors.request.use( req => {
//                 this.setState( { error: null } );
//                 return req;
//             } );
//             this.resInterceptor = axios.interceptors.response.use( res => res, error => {
//                 this.setState( { error: error } );
//             } );
//         }

//         componentWillUnmount () {
//             axios.interceptors.request.eject( this.reqInterceptor );
//             axios.interceptors.response.eject( this.resInterceptor );
//         }

//         errorConfirmedHandler = () => {
//             this.setState( { error: null } );
//         }

//         render () {
//             return (
//                 <Aux>
//                     <Modal
//                         show={this.state.error}
//                         modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             );
//         }
//     }
// }

// export default withErrorHandler;






import React, {useEffect, useState}from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';




const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {

		const [errorState, setErrorState] = useState(null);

		// like componentWillMount
			const reqInterceptor = axios.interceptors.request.use(req => {
				setErrorState(null);
				return req;
			});
			const resInterceptor = axios.interceptors.response.use(res => res, error => {
				setErrorState(error);
				
			});

		// ENDS like componentWillMount

        useEffect(() => { // like componentWillUnmount
            return () => {
                    axios.interceptors.request.eject(reqInterceptor);
                    axios.interceptors.response.eject(resInterceptor);
                    }
        }, [reqInterceptor, resInterceptor]);	// ENDS like componentWillUnmount
			
				
		const errorConfirmedHandler = () => {
			setErrorState(false);
		}
		
		return(
			<Aux>
				<Modal 	show={errorState}
						modalClosed={errorConfirmedHandler}
				>
					{errorState ? errorState.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	}
}

export default withErrorHandler;