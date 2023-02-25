/* ↓Redux Imports ALL */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Redux-reducer/reducer';

/* Realtime Composer */
const composeEnhancers = composeWithDevTools({
	realtime: true
});

/* ストアの作成 */
export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
