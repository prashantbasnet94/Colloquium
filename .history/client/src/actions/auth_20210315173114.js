import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
} from './types';
import { setAlert } from './alert';
import { auth, googleAuthProvider } from '../services/firebase';

//login user
export const login = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};


	const body = { email, password };

	try {
		const res = await axios.post('http://localhost:5000/api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log('a' + err);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: LOGIN_FAILURE,
		});
	}
};

export const googleLogin =() => {
	auth.signInWithPopup(googleAuthProvider).then(async result => {
		const {user} = result;
		const  ifToken = await user.getIdTokenResult
	})
}
// register user
export const register = ({ name, email, major, password }) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = { name, email, major, password };
	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: REGISTER_FAILURE,
		});
	}
};
//logout

export const logout = () => (dispatch) => {
	auth.signOut();
	console.log('heiei');
	dispatch({ type: LOGOUT });
};
