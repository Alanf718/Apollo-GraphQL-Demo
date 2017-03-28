import {combineReducers} from 'redux';
import * as peopleReducer from '../components/PeopleView/reducers';

export default combineReducers({
    ...peopleReducer
});
