import * as React from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import {IRootProps} from './IRootProps';
import configureStore from '../store/configureStore';
import {IAppState} from '../store/IAppState';
import {Router, Route, IndexRoute, hashHistory, RedirectFunction, RouterState} from 'react-router';
import {syncHistoryWithStore, ReactRouterReduxHistory} from 'react-router-redux';
import {App} from '../components/App';
let Counter = require('../components/Counter').default;

export default class Root extends React.Component<IRootProps, void> {
    store: Redux.Store<IAppState> = configureStore();
    history: ReactRouterReduxHistory = syncHistoryWithStore(hashHistory, this.store);


    checkAuth(nextState: RouterState, replace: RedirectFunction, callback?: Function):void {
        console.log(nextState);
    }

    render() {
        if (process.env.NODE_ENV === 'production') {
            return (
                <Provider store={this.store}>
                    <Router history={this.history}>
                        <Route onEnter={this.checkAuth}>
                            <Route path='/' component={App}>
                                <IndexRoute component={Counter}/>
                            </Route>
                        </Route>
                    </Router>
                </Provider>
            );
        } else {
            return (
                <Provider store={this.store}>
                    <div>
                        <Router history={this.history}>
                            <Route onEnter={this.checkAuth}>
                                <Route path='/' component={App}>
                                    <IndexRoute component={Counter}/>
                                </Route>
                            </Route>
                        </Router>
                        <DevTools />
                    </div>
                </Provider>
            );
        }
    }
}
