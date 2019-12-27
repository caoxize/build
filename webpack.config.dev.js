// const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

const BASE_CONFIG = require('./webpack.config.base')

const { DEV_HOST, DEV_PORT, CSS_MODULES } = require('./config')

module.exports = merge(BASE_CONFIG, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitError: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: CSS_MODULES
                ? {
                    mode: CSS_MODULES,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                  }
                : false,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
    compress: true,
    host: DEV_HOST,
    port: DEV_PORT,
    // publicPath: '/assets/js/',
    contentBase: './dist/'
    // https: {
    //   key: fs.readFileSync(path.resolve(PROJECT_PATH, 'cert', 'server.key')),
    //   cert: fs.readFileSync(path.resolve(PROJECT_PATH, 'cert', 'server.crt')),
    //   ca: fs.readFileSync(path.resolve(PROJECT_PATH, 'cert', 'rootCA.pem'))
    // }
  },
  devtool: 'cheap-module-eval-source-map'
})
