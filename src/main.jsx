/* ↓React Imports ALL */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* ↓Css */
import './index.css';
import App from './App';

/* ↓Redux and Firebase Imports ALL */
import firebase from './firebase/initialize';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { store } from './features/store';

/* ↓Firebase and Redux Instance Props */
const rrfProps = {
	firebase,
	config: {
		userProfile: 'users'
	},
	dispatch: store.dispatch,
	createFirestoreInstance
};

/* ↓React Rooter DOM Initialization */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
);
