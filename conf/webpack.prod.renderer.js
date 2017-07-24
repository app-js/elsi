console.log("wp ---> ./conf/webpack.prod.renderer.js");
console.log("wp ---> env: " + process.env.NODE_ENV + " (undefined = development)");

const utils = require('./utils');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const loadersConfig = require('./webpack.loaders.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

module.exports = function (options) {
    return webpackMerge(
        loadersConfig(),
        {
            entry: './src/browser.js',
            
            output: {
                path: utils.root('dist'),
                filename: 'bundle.js'
            },

            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    inject: 'body',
                }),

                new CopyWebpackPlugin([{
                    from: './electron/package.json',
                    to: 'package.json'
                },
                {
                    from: './electron/main.js',
                    to: 'main.js'
                }])

            ],

            devtool: 'eval-source-map',

            target: 'electron-renderer'
        }
    );
}
