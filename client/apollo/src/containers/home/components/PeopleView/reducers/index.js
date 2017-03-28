import {Types} from '../actions';

export const peopleView = (state = {}, {type, payload}) => {
    switch (type) {
        case Types.MINIMIZE:
            return {visible: false};
        case Types.EXPAND:
            return {visible: true};
        default:
            return state;
    }
};
