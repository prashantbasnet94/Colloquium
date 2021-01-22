import {
	GET_USER_QUESTION,
	GET_USER_QUESTION_ERROR,
	DELETE_SUCCESS,
} from '../actions/types';
const initialState = {
	loading: true,
	userQuestions: [],
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_QUESTION:
			return {
				...state,
				loading: false,
				userQuestions: payload,
			};
		case GET_USER_QUESTION_ERROR:
			return {
				...state,
				loading: false,
			};

		case DELETE_SUCCESS:
			return {
				...state,
				userQuestions: payload,
				deleted: true,
			};
		default:
			return state;
	}
}
