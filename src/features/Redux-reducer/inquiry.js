/* ↓Import Message */
import { INQUIRY_ADDED, ERROR } from '../actions';

/* ↓Initialize State */
const initState = {};

const inquiryReducer = (state = initState, action) => {
    switch (action.type) {
        case INQUIRY_ADDED:
        // console.log(action.inquiry + '投稿が完了しました。');
        return state;
        case ERROR:
        console.log('inquiry error : ' + action.err);
        return state;
        default:
        return state;
    };
};

export default inquiryReducer;
