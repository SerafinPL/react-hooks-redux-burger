import {useState, useEffect} from 'react';


export default httpClient => {
	const [errorState, setErrorState] = useState(null);

		// like componentWillMount
	const reqInterceptor = httpClient.interceptors.request.use(req => {
		setErrorState(null);
		return req;
	});
	const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
		setErrorState(error);
		
	});

		// ENDS like componentWillMount

    useEffect(() => { // like componentWillUnmount
        return () => {
                httpClient.interceptors.request.eject(reqInterceptor);
                httpClient.interceptors.response.eject(resInterceptor);
                }
        // eslint-disable-next-line
    }, [reqInterceptor, resInterceptor]);	// ENDS like componentWillUnmount
		
			
	const errorConfirmedHandler = () => {
		setErrorState(false);
	}

	return [errorState, errorConfirmedHandler];
}

