import { GET_ONE_TUTOR } from '../actions/types';

const initialState = {
	profile: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_ONE_TUTOR:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		default:
			return state;
	}
}
