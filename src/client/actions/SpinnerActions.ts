import {SHOW_SPINNER_ACTION, HIDE_SPINNER_ACTION} from './ActionTypes';
import Action = Redux.Action;

function show(): Action {
    return {
        type: SHOW_SPINNER_ACTION
    };
}

function hide(): Action {
    return {
        type: HIDE_SPINNER_ACTION
    };
}

export default {
    show,
    hide
};
