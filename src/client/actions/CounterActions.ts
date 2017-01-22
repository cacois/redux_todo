import {INCREMENT_COUNTER_ACTION, DECREMENT_COUNTER_ACTION} from './ActionTypes';
import Action = Redux.Action;

function increment(): Action {
    return {
        type: INCREMENT_COUNTER_ACTION
    };
}

function decrement(): Action {
    return {
        type: DECREMENT_COUNTER_ACTION
    };
}

function incrementIfOdd() {
    return (dispatch: Function, getState: Function) => {
        const {counter} = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

function incrementAsync() {
    return (dispatch: Function) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(increment());
                resolve();
            }, 1000);
        });
    };
}

export default {
    increment,
    decrement,
    incrementIfOdd,
    incrementAsync
};
