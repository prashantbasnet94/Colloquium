import { GET_SEARCHVALUE, SEARCH_FAILURE, GET_QUESTION } from './types';
import axios from 'axios';
export const getQuestionSearch = ({ searchValue }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { searchValue };
	const uri = 'api/search/question';
	try {
		const res = await axios.post(uri, body, config);
		dispatch({ type: GET_QUESTION, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;
		console.log(errors);
		dispatch({
			type: SEARCH_FAILURE,
		});
	}
};
