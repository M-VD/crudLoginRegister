const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
    clean: true,
    //to use nested routes
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: '../build',
    hot: true,
    open: true,
    historyApiFallback: true,
  },
})
