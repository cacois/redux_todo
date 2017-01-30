import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import * as thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import Store = Redux.Store;
import {routerMiddleware} from 'react-router-redux';
import {hashHistory} from 'react-router';

export interface IAppState {
    counter: number | null;
    authToken: string | null;
    isWaiting: Boolean;
}

export default function configureStore(): Store<IAppState> {
    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'production') {
        const enhancer = applyMiddleware(thunk.default, routerMiddleware(hashHistory));
        return createStore<IAppState>(require('../reducers').rootReducer, enhancer);
    } else {
        // https://github.com/gaearon/redux-thunk/issues/51
        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const enhancer = composeEnhancers(
            applyMiddleware(routerMiddleware(hashHistory), thunk.default),
            DevTools.instrument(),
            persistState(
                /* istanbul ignore next */
                window.location.href.match(/[?&]debug_session=([^&#]+)\b/) ?
                    window.location.href.match(/[?&]debug_session=([^&#]+)\b/)[0] :
                    null
            )
        );

        const store = createStore<IAppState>(require('../reducers').rootReducer, enhancer);

        /* istanbul ignore next */
        if ((<any>module).hot) {
            (<any>module).hot.accept('../reducers', () => {
                store.replaceReducer(require('../reducers').rootReducer);
            });
        }

        return store;
    }
}
