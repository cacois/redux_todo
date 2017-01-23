import Action = Redux.Action;
import {LOGGED_IN_ACTION, LOGOUT_ACTION} from '../actions/ActionTypes';
import {LoggedInAction} from '../actions/AuthActions';

export function authReducer(state: string = null, action: Action) {
    switch (action.type) {
        case LOGGED_IN_ACTION:
            return (<LoggedInAction>action).token;
        case LOGOUT_ACTION:
            return null;
        default:
            return state;
    }
}
