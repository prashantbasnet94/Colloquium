import { SET_UPVOTE, UPVOTE_ERROR } from '../actions/types';
import axios from 'axios';
export const setUpvote = ({ id }) => async (dispatch) => {
	const uri = `/api/questions/comment/${id}`;
	console.log(uri);
	try {
		const res = await axios.post(uri);
		console.log(res.data);
		dispatch({
			type: SET_UPVOTE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({ type: UPVOTE_ERROR });
	}
};
