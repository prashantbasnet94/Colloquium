import { GET_TUTORS, GET_ONE_TUTOR } from './types';
import axios from 'axios';
export const getTutors = () => async (dispatch) => {
	const uri = 'api/profile';
	try {
		const res = await axios.get(uri);
		dispatch({ type: GET_TUTORS, payload: res.data });
	} catch (err) {
		console.log('error');
	}
};
export const getOneTutor = ({ id }) => async (dispatch) => {
	const uri = `/api/profile/${id}`;
	console.log('yo muyan');
	console.log(uri);
	try {
		const res = await axios.get(uri);
		console.log(res);
		dispatch({ type: GET_ONE_TUTOR, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};
