import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
	GET_QUESTION,
	QUESTION_ERROR,
	SUBMIT_SUCCESS,
	SUBMIT_FAILURE,
	DELETE_SUCCESS,
	DELETE_FAILURE,
	GET_USER_QUESTION,
	GET_USER_QUESTION_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';
export const loadQuestions = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/questions');
		dispatch({ type: GET_QUESTION, payload: res.data });
	} catch (err) {
		dispatch({ type: QUESTION_ERROR });
	}
};

export const loadQuestionById = ({ id }) => async (dispatch) => {
	const uri = `/api/questions/${id}`;
	try {
		const res = await axios.get(uri);
		dispatch({ type: GET_USER_QUESTION, payload: res.data });
	} catch (err) {
		dispatch({ type: GET_USER_QUESTION_ERROR });
	}
};

export const submitQuestion = ({ subject, section, problem, link }) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { subject, section, problem, link };
	try {
		const res = await axios.post('api/questions', body, config);
		dispatch({
			type: SUBMIT_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: SUBMIT_FAILURE,
		});
	}
};

export const deleteQuestion = ({ id }) => async (dispatch) => {
	console.log('it reached here');
	const uri = `/api/questions/${id}`;

	try {
		const res = await axios.delete(uri);
		console.log(res);
		dispatch(setAlert('Question deleted succesfully', 'success'));
		dispatch({ type: DELETE_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: DELETE_FAILURE,
		});
	}
};
