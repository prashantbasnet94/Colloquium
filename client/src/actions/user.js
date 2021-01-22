import axios from 'axios';
import {
	USER_LOADED,
	LOAD_ERROR,
	GET_USER_BYID,
	GET_USER_BYID_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: LOAD_ERROR,
		});
	}
};
export const loadUserbyId = ({ id }) => async (dispatch) => {
	console.log(id);
	const uri = `/api/auth/${id}`;
	try {
		const res = await axios.get(uri);

		dispatch({
			type: GET_USER_BYID,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_USER_BYID_ERROR,
		});
	}
};
