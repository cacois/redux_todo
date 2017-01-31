import * as express from 'express';
import * as bodyParser from 'body-parser';
import {ApiRouter} from './apis/ApiRouter';

export class Server {
    /* istanbul ignore next */
    private static configureHmrMiddleware(app: express.Express) {
        let webpack = require('webpack');
        let webpackDevMiddleware = require('webpack-dev-middleware');
        let webpackHotMiddleware = require('webpack-hot-middleware');
        let webpackClientConfig = require('../../webpack.client.js')[0];
        let compiler = webpack(webpackClientConfig);

        app.use(webpackDevMiddleware(compiler, {
            hot: true,
            filename: 'main.js',
            publicPath: webpackClientConfig.output.publicPath,
            stats: {
                colors: true,
            },
            historyApiFallback: true
        }));

        app.use(webpackHotMiddleware(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000
        }));
    }

    private static configureApi(app: express.Express) {
        app.use(bodyParser.json());
        app.use('/api', (new ApiRouter()).router);
    }

    constructor(public app: express.Express, private port: number) {
        /* istanbul ignore next */
        if (process.env.NODE_ENV === 'hmr') {
            Server.configureHmrMiddleware(app);
        } else {
            app.use('/', express.static('public'));
        }
        Server.configureApi(app);
    }

    /* istanbul ignore next */
    public run() {
        this.app.listen(this.port);
    }
}
