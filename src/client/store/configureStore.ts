import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import * as thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import Store = Redux.Store;
import {IAppState} from './IAppState';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

export default function configureStore(): Store<IAppState> {
    if (process.env.NODE_ENV === 'production') {
        const enhancer = applyMiddleware(thunk.default, routerMiddleware(browserHistory));
        return createStore<IAppState>(require('../reducers').rootReducer, enhancer);
    } else {
        // https://github.com/gaearon/redux-thunk/issues/51
        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const enhancer = composeEnhancers(
            applyMiddleware(thunk.default),
            DevTools.instrument(),
            persistState(
                window.location.href.match(/[?&]debug_session=([^&#]+)\b/) ?
                    window.location.href.match(/[?&]debug_session=([^&#]+)\b/)[0] :
                    null
            )
        );

        let store = createStore<IAppState>(require('../reducers').rootReducer, enhancer);

        if ((<any>module).hot) {
            (<any>module).hot.accept('../reducers', () => {
                console.log('replaceReducer');
                store.replaceReducer(require('../reducers').rootReducer);
            });
        }

        return store;
    }
}
