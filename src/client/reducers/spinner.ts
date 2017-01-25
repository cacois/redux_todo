import Action = Redux.Action;
import {SHOW_SPINNER_ACTION, HIDE_SPINNER_ACTION} from '../actions/ActionTypes';

export function spinnerReducer(state: Boolean = false, action: Action) {
    switch (action.type) {
        case SHOW_SPINNER_ACTION:
            return true;
        case HIDE_SPINNER_ACTION:
            return false;
        default:
            return false;
    }
}
