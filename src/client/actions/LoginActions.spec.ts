import LoginActions from '../actions/LoginActions';
import {LOGGED_IN_ACTION, LOGOUT_ACTION} from './ActionTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';

describe('LoginActions', () => {
    it('should authorize when the API returns HTTP/200', () => {
        const middlewares: any[] = [thunk];
        const mockStore = configureStore(middlewares);
        const initialState = {
            authToken: null as string
        };

        const expectedActions = [
            {'type': 'App/Spinner/SHOW_SPINNER'},
            {'type': 'App/Spinner/HIDE_SPINNER'},
            {
                'type': 'App/Auth/LOGGED_IN',
                'token': 'token'
            },
            {
                'type': '@@router/CALL_HISTORY_METHOD',
                'payload': {'method': 'push', 'args': ['/']}
            }];

        const store = mockStore(initialState);

        fetchMock.restore();
        fetchMock.post('/api/auth', {
            status: 200,
            body: {},
            headers: {
                Authentication: 'token'
            }
        });

        return store.dispatch(LoginActions.login('test', 'test')).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });

    it('should not authorize when the API returns HTTP/401', () => {
        const middlewares: any[] = [thunk];
        const mockStore = configureStore(middlewares);
        const initialState = {
            authToken: null as string
        };

        const expectedActions = [
            {'type': 'App/Spinner/SHOW_SPINNER'},
            {'type': 'App/Spinner/HIDE_SPINNER'},
        ];

        const store = mockStore(initialState);

        fetchMock.restore();
        fetchMock.post('/api/auth', {
            status: 401,
            body: {},
            headers: {}
        });

        return store.dispatch(LoginActions.login('test', 'test')).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });

    it('should not authorize when the API returns HTTP/500', () => {
        const middlewares: any[] = [thunk];
        const mockStore = configureStore(middlewares);
        const initialState = {
            authToken: null as string
        };

        const expectedActions = [
            {'type': 'App/Spinner/SHOW_SPINNER'},
            {'type': 'App/Spinner/HIDE_SPINNER'},
        ];

        const store = mockStore(initialState);

        fetchMock.restore();
        fetchMock.post('/api/auth', {
            status: 500,
            body: {},
            headers: {}
        });

        return store.dispatch(LoginActions.login('test', 'test')).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });

    it('should create a logged in action', () => {
        const expectedAction = {
            type: LOGGED_IN_ACTION,
            token: 'token'
        };
        expect(LoginActions.loggedIn('token')).toEqual(expectedAction);
    });

    it('should create a logout action', () => {
        const expectedAction = {
            type: LOGOUT_ACTION
        };
        expect(LoginActions.logout()).toEqual(expectedAction);
    });
});
