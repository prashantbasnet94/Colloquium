import React, {useReducer, createContext}
import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
} from '../actions/types';

const initialState = {
	// token: localStorage.token,
	token: null,
	isAuthenticated: false,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		// case USER_LOADED:
		// 	return {
		// 		...state,
		// 		user: payload,
		// 		isAuthenticated: true,
		// 		loading: false,
		// 	};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			// localStorage.setItem('isAuth', 'true');
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case LOGOUT:
			localStorage.removeItem('token');
			localStorage.removeItem('persist:root');
			// storage.removeItem('persist:otherKey')
			return {
				state: undefined,
			};
		// return {
		// 	...state,
		// 	token: null,
		// 	isAuthenticated: false,
		// 	loading: true,
		// };
		default:
			return state;
	}
}
