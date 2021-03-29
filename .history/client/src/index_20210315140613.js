import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { Provider } from 'react-redux';
import {
	AuthProvider
} from './reducers/user';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';

const app = (
	<BrowserRouter>
		<PersistGate persistor={persistor}>
			<
			<App />
		</PersistGate>
	</BrowserRouter>
);

ReactDOM.render(
	<Provider store={store}>{app}</Provider>,

	document.getElementById('root')
);
