import {counterReducer} from './counter';
import {INCREMENT_COUNTER_ACTION, DECREMENT_COUNTER_ACTION} from '../actions/ActionTypes';

describe('reducers', () => {
    describe('counter', () => {
        it('should provide the initial state', () => {
            expect(counterReducer(undefined, {type: ''})).toBe(0);
        });

        it('should handle INCREMENT action', () => {
            expect(counterReducer(1, {type: INCREMENT_COUNTER_ACTION})).toBe(2);
        });

        it('should handle DECREMENT action', () => {
            expect(counterReducer(1, {type: DECREMENT_COUNTER_ACTION})).toBe(0);
        });

        it('should ignore unknown actions', () => {
            expect(counterReducer(1, {type: ''})).toBe(1);
        });
    });
});
