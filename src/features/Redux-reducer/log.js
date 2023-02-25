/* ↓Import Message */
import { LOG_ADDED, ERROR } from '../actions';

/* ↓Initialize State */
const initState = {};

const logReducer = (state = initState, action) => {
    switch (action.type) {
        case LOG_ADDED:
        // console.log(action.log + '投稿が完了しました。');
        return state;
        case ERROR:
        console.log('log error : ' + action.err);
        return state;
        default:
        return state;
    };
};

export default logReducer;
