const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')

const devConfig = merge(commonConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 8001,
    open: true,
    historyApiFallback: true
  }
})

module.exports = devConfig
