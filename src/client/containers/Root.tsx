import * as React from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import configureStore from '../store/configureStore';
import {IAppState} from '../store/IAppState';
import {Router, Route, IndexRoute, hashHistory, RedirectFunction, RouterState} from 'react-router';
import {syncHistoryWithStore, ReactRouterReduxHistory} from 'react-router-redux';
import App from '../components/App';
import Login from '../components/Login';
import Counter from '../components/Counter';

interface IRootProps {
}

export default class Root extends React.Component<IRootProps, void> {
    store: Redux.Store<IAppState> = configureStore();
    history: ReactRouterReduxHistory = syncHistoryWithStore(hashHistory, this.store);

    checkAuth = (nextState: RouterState, replace: RedirectFunction): void => {
        if (!this.store.getState().authToken) {
            replace('/login');
        }
    }

    render() {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'production') {
            return (
                <Provider store={this.store}>
                    <Router history={this.history}>
                        <Route path='/login' component={Login}/>
                        <Route onEnter={this.checkAuth} path='/' component={App}>
                            <IndexRoute component={Counter}/>
                        </Route>
                    </Router>
                </Provider>
            );
        } else {
            return (
                <Provider store={this.store}>
                    <div>
                        <Router history={this.history}>
                            <Route path='/login' component={Login}/>
                            <Route onEnter={this.checkAuth} path='/' component={App}>
                                <IndexRoute component={Counter}/>
                            </Route>
                        </Router>
                        <DevTools />
                    </div>
                </Provider>
            );
        }
    }
}
