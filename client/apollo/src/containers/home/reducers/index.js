import {combineReducers} from 'redux';
import * as peopleReducer from '../components/PeopleView/reducers';

export default combineReducers({
    ...peopleReducer
});

// export const home = (state = [], {type, payload}) => {
//     switch (type) {
//         default:
//             return state;
//     }
// };


