/* ↓Redux and Reducer Imports ALL */
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import packageReducer from './package';
import scrapReducer from './scrap';
import inquiryReducer from './inquiry';
import logReducer from './log';
import userReducer from './user';

/* ↓Root Reducer */
const rootReducer = combineReducers({
    package: packageReducer,
    scrap: scrapReducer,
    inquiry: inquiryReducer,
    log: logReducer,
    user: userReducer,
    firestore: firestoreReducer,
});

export default rootReducer;
