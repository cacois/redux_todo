let webpack = require('webpack');
let helpers = require('./webpack.helpers');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let clientConfig = {
    target: "web",
    devtool: "eval-source-map",
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'react-hot-loader/patch',
        './src/client/index.tsx'
    ],
    output: {
        path: helpers.root('dist/public'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    resolve: {
        cache: false,
        root: helpers.root(),
        extensions: ['', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        preLoaders: [
            {test: /\.tsx?$/, loader: 'tslint-loader'}],
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["react-hot-loader/webpack", "ts-loader?configFileName=./src/client/tsconfig.json"]
            },
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, loaders: ['raw', 'sass']},
            {test: /\.less/, loader: "style!css!less"},
            {test: /\.png$/, loader: "url-loader?prefix=img/&limit=5000"},
            {test: /\.jpg$/, loader: "url-loader?prefix=img/&limit=5000"},
            {test: /\.gif$/, loader: "url-loader?prefix=img/&limit=5000"},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.html$/, loader: 'raw'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/public/index.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'})
    ]
};

module.exports = [clientConfig];
