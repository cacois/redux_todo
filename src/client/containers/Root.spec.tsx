import * as React from 'react';
import {mount} from 'enzyme';
import Root from './Root';
import {IAppState} from '../store/IAppState';
import {hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {Store, createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../reducers/index';
import LoginActions from '../actions/LoginActions';

function setup() {
    const store: Store<IAppState> = createStore<IAppState>(rootReducer, applyMiddleware(routerMiddleware(hashHistory)));
    const history = syncHistoryWithStore(hashHistory, store);
    const component = mount(<Root store={store}/>);

    return {
        component: component,
        history: history,
        store: store
    };
}

describe('Root component', () => {
    it('should create the root component', () => {
        const {component, history, store} = setup();
        expect(component.exists()).toBeTruthy();
    });

    it('should redirect by default to /login when there\'s no auth token', () => {
        const {component, history, store} = setup();
        expect(store.getState().routing.locationBeforeTransitions.pathname).toEqual('/login');
    });

    it('should redirect to /login when there\'s no auth token', () => {
        const {component, history, store} = setup();
        history.push('/');
        expect(store.getState().routing.locationBeforeTransitions.pathname).toEqual('/login');
    });

    it('should allow navigation to / when there\'s an auth token', () => {
        const {component, history, store} = setup();
        store.dispatch(LoginActions.loggedIn('token'));
        expect(store.getState().authToken).not.toBeNull();
        history.push('/');
        expect(store.getState().routing.locationBeforeTransitions.pathname).toEqual('/');
    });
});

