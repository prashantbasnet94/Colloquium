import { GET_SEARCHVALUE, SEARCH_FAILURE } from '../actions/types';
const initialState = {
	questions: null,
	loading: true,
	searched: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_SEARCHVALUE:
			return {
				...state,
				loading: false,
				questions: payload,
				searched: true,
			};
		case SEARCH_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
