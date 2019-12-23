const path = require('path')
const cssnano = require('cssnano')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BASE_CONFIG = require('./webpack.config.base')
const { ENTRY, PROJECT_PATH, CSS_MODULES } = require('./config')

module.exports = merge(BASE_CONFIG, {
  mode: 'production',
  entry: ENTRY,
  output: {
    filename: '[name]-[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),
    ...Object.keys(ENTRY).map(item => {
      return new HtmlWebpackPlugin({
        template: path.join(PROJECT_PATH, `public/${item}.html`),
        filename: `${item}.html`,
        chunks: [item, 'vendors'],
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
  ]
})
