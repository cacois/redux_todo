import {spinnerReducer} from './spinner';
import {SHOW_SPINNER_ACTION, HIDE_SPINNER_ACTION} from '../actions/ActionTypes';

describe('reducers', () => {
    describe('spinner', () => {
        it('should provide the initial state', () => {
            expect(spinnerReducer(undefined, {type: ''})).toBe(false);
        });

        it('should handle SHOW action', () => {
            expect(spinnerReducer(false, {type: SHOW_SPINNER_ACTION})).toBe(true);
        });

        it('should handle HIDE action', () => {
            expect(spinnerReducer(true, {type: HIDE_SPINNER_ACTION})).toBe(false);
        });

        it('should ignore unknown actions', () => {
            expect(spinnerReducer(true, {type: ''})).toBe(false);
        });
    });
});
