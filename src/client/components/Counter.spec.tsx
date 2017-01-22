import * as React from 'react';
import {mount} from 'enzyme';
import {Counter, mapStateToProps} from './Counter';
import {IAppState} from '../store/IAppState';

function setup(value = 0) {
    const actions = {
        increment: jest.fn(),
        incrementIfOdd: jest.fn(),
        incrementAsync: jest.fn(),
        decrement: jest.fn()
    };

    const component = mount(
        <Counter counter={value} {...actions} />
    );

    return {
        component: component,
        actions: actions,
        buttons: component.find('button'),
        p: component.find('p')
    };
}

describe('Counter component', () => {
    it('should extract counter in the selector', () => {
        const testState: IAppState = {
            counter: 0
        };
        const expectedState = {
            counter: 0
        };
        expect(mapStateToProps(testState)).toEqual(expectedState);
    });

    it('should display count', () => {
        const {p} = setup();
        expect(p.text()).toMatch(/^Clicked: 0 times/);
    });

    it('first button should call increment', () => {
        const {buttons, actions} = setup();
        buttons.at(0).simulate('click');
        expect(actions.increment).toBeCalled();
    });

    it('second button should call decrement', () => {
        const {buttons, actions} = setup();
        buttons.at(1).simulate('click');
        expect(actions.decrement).toBeCalled();
    });

    it('third button should not call increment if the counter is even', () => {
        const {buttons, actions} = setup(42);
        buttons.at(2).simulate('click');
        expect(actions.increment).not.toBeCalled();
    });

    it('third button should call incrementIfOdd if the counter is odd', () => {
        const {buttons, actions} = setup(43);
        buttons.at(2).simulate('click');
        expect(actions.incrementIfOdd).toBeCalled();
    });

    it('third button should call incrementIfOdd if the counter is odd and negative', () => {
        const {buttons, actions} = setup(-43);
        buttons.at(2).simulate('click');
        expect(actions.incrementIfOdd).toBeCalled();
    });
});
