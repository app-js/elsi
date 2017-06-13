const webpack = require('webpack')

module.exports = {
  entry: './browser.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'eval-source-map'
}
