import * as React from 'react';
import {mount} from 'enzyme';
import Root from './Root';
import LoginActions from '../actions/LoginActions';
import {hashHistory} from 'react-router';

const component = mount<{}, void>(<Root/>);

let sessionStorageMock = () => {
    let store = {};
    return {
        getItem: function(key:string) {
            return store[key];
        },
        setItem: function(key:string, value:any) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
};
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock() });

describe('Root component', () => {
    it('should create the root component', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should allow navigation to /login', () => {
        let store = (component.instance() as Root).store;
        hashHistory.push('/login');
        expect((store.getState() as any).routing.locationBeforeTransitions.pathname).toEqual('/login');
    });

    it('should redirect by default to /login when there\'s no auth token', () => {
        let store = (component.instance() as Root).store;
        expect((store.getState() as any).routing.locationBeforeTransitions.pathname).toEqual('/login');
    });

    it('should redirect to /login when there\'s no auth token', () => {
        let store = (component.instance() as Root).store;
        hashHistory.push('/');
        expect((store.getState() as any).routing.locationBeforeTransitions.pathname).toEqual('/login');
    });

    it('should allow navigation to / when there\'s an auth token', () => {
        let store = (component.instance() as Root).store;
        store.dispatch(LoginActions.loggedIn('token'));
        hashHistory.push('/');
        expect((store.getState() as any).routing.locationBeforeTransitions.pathname).toEqual('/');
    });

    it('should allow navigation to / when there\'s an auth token and state', () => {
        let store = (component.instance() as Root).store;
        store.dispatch(LoginActions.loggedIn('token'));
        hashHistory.replace({pathname:'/', state: { test:1 }});
        expect((store.getState() as any).routing.locationBeforeTransitions.pathname).toEqual('/');
    });
});

