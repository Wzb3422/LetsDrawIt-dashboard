const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodConfig = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
})

module.exports = prodConfig
