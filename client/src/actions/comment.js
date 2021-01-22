import axios from 'axios';
import {
	COMMENT_FAILURE,
	COMMENT_SUCCESS,
	GET_COMMENT,
	FAIL_COMMENT,
} from '../actions/types';
import { setAlert } from './alert';
export const submitComment = ({ id, content }) => async (dispatch) => {
	const uri = `/api/questions/${id}`;
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { content };
	console.log(body);
	try {
		const res = await axios.post(uri, body, config);
		dispatch(setAlert('Comment added successfully.', 'success'));
		dispatch({ type: COMMENT_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: COMMENT_FAILURE,
		});
	}
};

export const getComment = ({ id }) => async (dispatch) => {
	// console.log({ id });
	const uri = `/api/questions/comment/${id}`;
	try {
		const res = await axios.get(uri);
		// console.log(uri);
		console.log(res.data);
		dispatch({ type: GET_COMMENT, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: FAIL_COMMENT,
		});
	}
};
