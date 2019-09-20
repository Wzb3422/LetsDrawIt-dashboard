const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }, {
        test: /\.ttf$/,
        loader: 'file-loader',
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new CopyPlugin([{
        from: path.resolve(__dirname, '../src/static'),
        to: path.resolve(__dirname, '../dist/static')
      }])
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, '../src/assets')
    },
    extensions: ['.js', '.jsx', '.jpg', '.png', '.json']
  }
}

module.exports = commonConfig
