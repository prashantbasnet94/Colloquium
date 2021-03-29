import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import alert from './alert';
import auth from './auth';
import question from './question';
import comment from './comment';
import userQuestion from './userQuestion';
import tutorList from './tutorList';
import tutor from './tutor';
import userName from './userName';
import search from './search';
import imageUpload from './imageUpload';
const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'question',
		'comment',
		'userQuestion',
		'user',
		'auth',
		'tutorList',
		'tutor',
		'userName',
		'search',
		'imageUpload'
	],
};

const rootReducer = combineReducers({
	alert,
	auth,
	question,
	comment,
	tutorList,
	userQuestion,
	user,
	tutor,
	userName,
	search,
	imageUpload
});

export default persistReducer(persistConfig, rootReducer);
