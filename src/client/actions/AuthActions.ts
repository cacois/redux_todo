import {LOGIN_ACTION, LOGOUT_ACTION, LOGGED_IN_ACTION} from './ActionTypes';
import Action = Redux.Action;

export class LoginAction implements Action {
    type: any;
    username: string;
    password: string;
}

export class LoggedInAction implements Action {
    type: any;
    token: string;
}

function login(username: string, password: string): LoginAction {
    return {
        type: LOGIN_ACTION,
        username: username,
        password: password
    };
}

function loggedIn(token: string): LoggedInAction {
    return {
        type: LOGIN_ACTION,
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
