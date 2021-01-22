import {
	COMMENT_SUCCESS,
	COMMENT_FAILURE,
	GET_COMMENT,
	FAIL_COMMENT,
	SET_UPVOTE,
	UPVOTE_ERROR,
} from '../actions/types';

const initialState = {
	comments: [],
	loading: true,
	comm: null,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_COMMENT:
		case COMMENT_SUCCESS:
			return {
				...state,
				comments: payload,
				loading: false,
			};
		case FAIL_COMMENT:
			return {
				...state,
				loading: false,
			};

		case COMMENT_FAILURE:
		case UPVOTE_ERROR:
			return {
				...state,
			};
		case SET_UPVOTE:
			return {
				...state,
				comments: state.comments.map((comm) =>
					comm._id === payload._id
						? { ...comm, value: payload.value, upvoted: true }
						: comm
				),
			};
		default:
			return state;
	}
}
