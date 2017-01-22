import Action = Redux.Action;
import {INCREMENT_COUNTER_ACTION, DECREMENT_COUNTER_ACTION} from '../actions/ActionTypes';

export function counterReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case INCREMENT_COUNTER_ACTION:
            return state + 1;
        case DECREMENT_COUNTER_ACTION:
            return state - 1;
        default:
            return state;
    }
}
