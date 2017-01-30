import * as React from 'react';
import {mount} from 'enzyme';
import {IAppState} from '../store/configureStore';
import {Spinner, SpinnerSelector} from './Spinner';

function setup(value = false) {
    const component = mount(
        <Spinner isWaiting={value} />
    );

    return {
        component: component,
        div: component.find('div')
    };
}

describe('Spinner component', () => {
    it('should extract isWaiting in the selector', () => {
        const testState: IAppState = {
            counter: 0,
            authToken: '',
            isWaiting: false
        };
        const expectedState = {
            isWaiting: false
        };
        expect(SpinnerSelector(testState)).toEqual(expectedState);
    });

    it('should create a div when isWaiting is true', () => {
        const {div} = setup(true);
        expect(div.exists()).not.toBeFalsy();
    });

    it('should not create a div when isWaiting is false', () => {
        const {div} = setup(false);
        expect(div.exists()).toBeFalsy();
    });
});
