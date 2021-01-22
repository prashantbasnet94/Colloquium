import { GET_USER_BYID, GET_USER_BYID_ERROR } from '../actions/types';
const initialState = {
	loading: true,
	user: null,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_BYID:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case GET_USER_BYID_ERROR:
			// localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
}
