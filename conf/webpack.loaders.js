console.log("wp ---> ./conf/webpack.loaders.js");

module.exports = function (options) {
  return {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                // exclude: path.resolve(__dirname, 'src/app')
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',    // where the fonts will go
                    // publicPath: '../'       // override the default path
                }
                }]
            }
        ]
    }
  };
}
