import React, { useReducer, createContext } from 'react'
import { USER_LOADED, LOAD_ERROR, LOGOUT } from '../actions/types';

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
	const value = { state, dispatch }
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Export
export { AuthContext, AuthProvider };