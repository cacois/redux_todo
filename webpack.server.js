let webpack = require('webpack');
let helpers = require('./webpack.helpers');
let autoprefixer = require('autoprefixer');
let nodeExternals = require('webpack-node-externals');

let serverConfig = {
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'eval-source-map',
    entry: {
        'server': './src/server/main.ts'
    },
    module: {
        preLoaders: [{test: /\.tsx?$/, loader: 'tslint-loader'}],
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader?configFileName=./src/client/tsconfig.json"
            },
            {test: /\.json$/, loader: "json-loader"}
        ],
        postLoaders: []
    },
    output: {
        path: helpers.root('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        cache: false,
        root: helpers.root(),
        extensions: ['', '.ts', '.js', '.json']
    }
};

module.exports = [serverConfig];