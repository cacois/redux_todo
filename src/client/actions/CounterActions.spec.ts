import configureStore from 'redux-mock-store';
import CounterActions from '../actions/CounterActions';
import thunk from 'redux-thunk';
import {INCREMENT_COUNTER_ACTION, DECREMENT_COUNTER_ACTION} from './ActionTypes';

describe('CounterActions', () => {
    it('should create an increment action', () => {
        const expectedAction = {
            type: INCREMENT_COUNTER_ACTION
        };
        expect(CounterActions.increment()).toEqual(expectedAction);
    });

    it('should create a decrement action', () => {
        const expectedAction = {
            type: DECREMENT_COUNTER_ACTION
        };
        expect(CounterActions.decrement()).toEqual(expectedAction);
    });

    it('should not create an increment action if even', () => {
        const middlewares:any[] = [];
        const mockStore = configureStore(middlewares);
        const initialState = {
            counter: 2
        };
        const store = mockStore(initialState);

        CounterActions.incrementIfOdd()(store.dispatch, store.getState);
        const actions = store.getActions();
        expect(actions.length).toBe(0);
    });

    it('should create an increment action if odd', () => {
        const expectedAction = {
            type: INCREMENT_COUNTER_ACTION
        };

        const middlewares:any[] = [];
        const mockStore = configureStore(middlewares);
        const initialState = {
            counter: 1
        };
        const store = mockStore(initialState);

        CounterActions.incrementIfOdd()(store.dispatch, store.getState);
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
    });

    it('should create an async increment action', () => {
        const expectedAction = {
            type: INCREMENT_COUNTER_ACTION
        };

        const middlewares:any[] = [thunk];
        const mockStore = configureStore(middlewares);
        const initialState = {
            counter: 2
        };
        const store = mockStore(initialState);

        return store.dispatch(CounterActions.incrementAsync()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual(expectedAction);
        });
    });
});
