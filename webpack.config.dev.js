const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BASE_CONFIG = require('./webpack.config.base')

const {
  ENTRY,
  PROJECT_PATH,
  DEV_HOST,
  DEV_PORT,
  CSS_MODULES
} = require('./config')

module.exports = merge(BASE_CONFIG, {
  mode: 'development',
  entry: ENTRY,
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
                    mode: 'local',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...Object.keys(ENTRY).map(item => {
      return new HtmlWebpackPlugin({
        template: path.join(PROJECT_PATH, `public/${item}.html`),
        filename: `${item}.html`,
        chunks: [item],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    })
  ],
  devServer: {
    hot: true,
    compress: true,
    host: DEV_HOST,
    port: DEV_PORT,
    // publicPath: '/assets/js/',
    contentBase: './dist/'
  },
  devtool: 'cheap-module-eval-source-map'
})
