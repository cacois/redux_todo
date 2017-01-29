import {loginReducer} from './login';
import {LOGGED_IN_ACTION, LOGOUT_ACTION} from '../actions/ActionTypes';
import {LoggedInAction} from '../actions/LoginActions';

describe('reducers', () => {
    describe('auth', () => {
        it('should provide the initial state', () => {
            expect(loginReducer(undefined, {type: ''})).toBe(null);
        });

        it('should handle LOGGED_IN_ACTION action', () => {
            expect(loginReducer('', <LoggedInAction>{type: LOGGED_IN_ACTION, token: 'token'})).toBe('token');
        });

        it('should handle LOGOUT_ACTION action', () => {
            expect(loginReducer('token', {type: LOGOUT_ACTION})).toBe(null);
        });
    });
});
