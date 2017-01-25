import SpinnerActions from '../actions/SpinnerActions';
import {SHOW_SPINNER_ACTION, HIDE_SPINNER_ACTION} from './ActionTypes';

describe('SpinnerActions', () => {
    it('should create a show action', () => {
        const expectedAction = {
            type: SHOW_SPINNER_ACTION
        };
        expect(SpinnerActions.show()).toEqual(expectedAction);
    });

    it('should create a hide action', () => {
        const expectedAction = {
            type: HIDE_SPINNER_ACTION
        };
        expect(SpinnerActions.hide()).toEqual(expectedAction);
    });
});
