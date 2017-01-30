import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './containers/Root';

require('es6-promise').polyfill();
require('bootstrap-less/bootstrap/index.less');
require('./style/app.less');

const rootEl = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root/>
        </AppContainer>,
        rootEl
    );
};

if (process.env.NODE_ENV !== 'production') {
    if ((module as any).hot) {
        (module as any).hot.accept(() => {
            setTimeout(render);
        });
    }
}

render();
