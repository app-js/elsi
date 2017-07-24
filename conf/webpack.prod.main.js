console.log("wp ---> ./conf/webpack.prod.main.js");
console.log("wp ---> env: " + process.env.NODE_ENV + " (undefined = development)");

const utils = require('./utils');
const webpackMerge = require('webpack-merge');

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  return webpackMerge.smart({
    entry: {
      'main.desktop': './electron/main.desktop.ts'
    },

    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      modules: [
        helpers.root('src'),
        'node_modules'
      ],

      alias: {
        components: helpers.root('src/app/components'),
        shared: helpers.root('src/app/shared'),
        assets: helpers.root('src/assets')
      },

    },

    module: {

      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        }
      ]
    },

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].bundle.map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js'

    },

    plugins: [

      new CopyWebpackPlugin([{
        from: 'electron/package.json',
        to: 'package.json'
      }])
    ],

    externals: [
      (function() {
        var IGNORES = [
          'electron'
        ];
        return function(context, request, callback) {
          if (IGNORES.indexOf(request) >= 0) {
            return callback(null, 'require(\'' + request + '\')');
          }
          return callback();
        };
      })()
    ],

    target: 'electron-main',

    node: {
      __dirname: false,
      __filename: false,
    }
  }, customConfig({env: ENV}));
}
