import {
	GET_QUESTION,
	QUESTION_ERROR,
	SUBMIT_FAILURE,
	SUBMIT_SUCCESS,
	DELETE_SUCCESS,
	DELETE_FAILURE,
} from '../actions/types';
const initialState = {
	questions: null,
	loading: true,
	error: {},
	oneq: true,
	deleted: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_QUESTION:
		case DELETE_FAILURE:
			return {
				...state,
				questions: payload,
				oneq: true,
				loading: false,
				deleted: false,
			};
		case QUESTION_ERROR:
		case SUBMIT_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case SUBMIT_SUCCESS:
			return {
				...state,
				questions: payload,
				oneq: false,
				loading: false,
			};
		default:
			return state;
	}
}
