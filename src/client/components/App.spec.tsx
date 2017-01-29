import * as React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

function setup() {
    const middlewares: any[] = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);
    const options = {
        context: {store},
        childContextTypes: {store: React.PropTypes.object.isRequired}
    };

    const component = mount(
        <App />
        , options);

    return {
        component: component,
        buttons: component.find('button'),
        header: component.find('header')
    };
}

describe('App component', () => {
    it('should display a header', () => {
        const {header} = setup();
        expect(header.text()).toMatch(/^Links:/);
    });

    it('first button should navigate to foo', () => {
        const {buttons} = setup();
        buttons.at(0).simulate('click');
    });
});
