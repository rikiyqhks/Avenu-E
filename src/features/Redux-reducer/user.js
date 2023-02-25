/* ↓Import Message */
import { USER_ADDED, ERROR } from '../actions';

/* ↓Initialize State */
const initState = {};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_ADDED:
        // console.log(action.user + '投稿が完了しました。');
        return state;
        case ERROR:
        console.log('user error : ' + action.err);
        return state;
        default:
        return state;
    };
};

export default userReducer;
