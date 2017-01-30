import * as React from 'react';
import {mount} from 'enzyme';
import {Login, mapStateToProps} from './Login';
import {IAppState} from '../store/configureStore';
import configureStore from 'redux-mock-store';

function setup() {
    const middlewares: any[] = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);
    const options = {
        context: {store},
        childContextTypes: {store: React.PropTypes.object.isRequired}
    };

    const actions = {
        login: jest.fn()
    };

    const component = mount(<Login {...actions} />, options);

    return {
        component: component,
        actions: actions,
        username: component.find('#username'),
        password: component.find('#password'),
        login: component.find('#login')
    };
}

describe('Login component', () => {
    it('should extract nothing in the selector', () => {
        const testState: IAppState = {
            counter: 0,
            authToken: '',
            isWaiting: false
        };
        const expectedState = {};
        expect(mapStateToProps(testState)).toEqual(expectedState);
    });

    it('should update state on username input', () => {
        const {component, username} = setup();
        username.simulate('change', {target: {value: 'testUsername'}});
        expect((component.state() as any).username).toEqual('testUsername');
    });

    it('should update state on password input', () => {
        const {component, password} = setup();
        password.simulate('change', {target: {value: 'testPassword'}});
        expect((component.state() as any).password).toEqual('testPassword');
    });

    it('should call login with username and password on button press', () => {
        const {actions, username, password, login} = setup();
        username.simulate('change', {target: {value: 'testUsername'}});
        password.simulate('change', {target: {value: 'testPassword'}});
        login.simulate('click');
        expect(actions.login).toHaveBeenCalledWith('testUsername', 'testPassword');
    });
});
