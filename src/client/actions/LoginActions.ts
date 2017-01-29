import {routerActions} from 'react-router-redux';
import SpinnerActions from './SpinnerActions';
import {LOGGED_IN_ACTION, LOGOUT_ACTION} from './ActionTypes';
import Action = Redux.Action;

export class LoggedInAction implements Action {
    type: any;
    token: string;
}

function login(username: string, password: string): Function {
    return (dispatch: Function) => {
        dispatch(SpinnerActions.show());
        let body = {
            username: username,
            password: password
        };
        return fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(SpinnerActions.hide());
                    dispatch(loggedIn(response.headers.get('Authentication')));
                    dispatch(routerActions.push('/'));
                } else if (response.status === 401) {
                    dispatch(SpinnerActions.hide());
                    // TODO: dispatch a LOGIN_FAILED and make sure UI handles it
                } else {
                    dispatch(SpinnerActions.hide());
                    // TODO: dispatch a LOGIN_FAILED and make sure UI handles it
                }
            });
    };
}

function loggedIn(token: string): LoggedInAction {
    return {
        type: LOGGED_IN_ACTION,
        token: token
    };
}

function logout(): Action {
    return {
        type: LOGOUT_ACTION
    };
}

export default {
    login,
    loggedIn,
    logout
};
