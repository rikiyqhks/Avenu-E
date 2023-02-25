/* ↓Import Message */
import { SCRAP_ADDED, ERROR } from '../actions';

/* ↓Initialize State */
const initState = {};

const scrapReducer = (state = initState, action) => {
    switch (action.type) {
        case SCRAP_ADDED:
        // console.log(action.scrap + '投稿が完了しました。');
        return state;
        case ERROR:
        console.log('scrap error : ' + action.err);
        return state;
        default:
        return state;
    };
};

export default scrapReducer;
