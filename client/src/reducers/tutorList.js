import { GET_TUTORS } from '../actions/types';

const initialState = {
	profiles: [],
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_TUTORS:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		default:
			return state;
	}
}
