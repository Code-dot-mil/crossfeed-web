var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./index.js', './scss/main.scss'],
    target: 'web',
    output: {
        path: './dist',
        filename: 'main.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            { test: /\.html$/, loader: 'html' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass-loader') },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
}