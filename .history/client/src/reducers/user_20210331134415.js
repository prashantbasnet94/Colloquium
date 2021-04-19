import React, { useReducer, createContext, useEffect } from 'react'
import { USER_LOADED, LOAD_ERROR, LOGOUT, O_AUTH, LOGIN_SUCCESS } from '../actions/types';
import { auth } from '../services/firebase'

const firebaseReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (action.type) {
		case O_AUTH: {
			return { ...state, user: action.payload }
		}
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


const initialState = {
	loading: true,
	user: null,
	error: {},
};

//Auth Context
const AuthContext = createContext();

//Auth Provider
const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(firebaseReducer, initialState);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			if (user) {
				const idToken = await user.getIdTokenResult();
				dispatch({
					type: O_AUTH,
					payload: {
						user: 
						email: user.email, token: idToken.token
					}
				})
			} else {
				dispatch({
					type: O_AUTH,
					payload: null
				})
			}
		})
		// Unpopulate
		return () => unsubscribe()
	}, [])
	const value = { state, dispatch }
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Export
export { AuthContext, AuthProvider };

export default firebaseReducer;