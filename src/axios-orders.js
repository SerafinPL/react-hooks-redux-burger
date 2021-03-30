
import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-5d89b-default-rtdb.firebaseio.com/'
});

export default instance;