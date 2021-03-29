import React, { useReducer, createContext } from 'react'
import { USER_LOADED, LOAD_ERROR, LOGOUT } from '../actions/types';

const firebaseReducer = (state, action) => {
	switch (action.type) {
		case "USER_LOADED":
			return {
				...state, user: action.payload
			}
		default:
			return state;
	}
}

const initialState = {
	loading: true,
	user: null,
	error: {},
};

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(firebaseReducer, initialState);
	const value = {state, dispatch}
	return AuthContext.Provider
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case LOAD_ERROR:
			// localStorage.removeItem('token');
			console.log(payload)
			return {
				...state,
				loading: false,
				error: payload,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}