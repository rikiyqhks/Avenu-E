/* ↓Import Message */
import { PACKAGE_ADDED, ERROR } from '../actions';

/* ↓Initialize State */
const initState = {};

const packageReducer = (state = initState, action) => {
    switch (action.type) {
        case PACKAGE_ADDED:
        // console.log(action.package + '投稿が完了しました。');
        return state;
        case ERROR:
        console.log('package error : ' + action.err);
        return state;
        default:
        return state;
    };
};

export default packageReducer;
