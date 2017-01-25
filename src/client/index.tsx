import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

require('es6-promise').polyfill();
require('bootstrap-less/bootstrap/index.less');
require('./style/app.less');

const rootEl = document.getElementById('root');

let render = () => {
    let Root = require('./containers/Root').default;
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
