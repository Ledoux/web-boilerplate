//
// IMPORTS
//

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

var config = require('./config')

var renderPages = require('../ssr/renderHtmlPages')
var renderShareImageTemplate = require('../ssr/renderShareImageTemplate')

//
// ENVIRONMENT
//

//
// EXPORTS
//

module.exports = Object.assign(
  config,
  {
    entry: Object.assign(
      {
        index: config.entry.index
      }
    ),
    module: {
      loaders: config.module.loaders.concat([
        {
          test: /\.s?css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
          exclude: /node_modules/
        }
      ])
    },
    output: {
      path: path.join(__dirname, '../dist/assets'),
      filename: '[hash].min.js'
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      new webpack.ProvidePlugin({
        'Promise': 'exports?global.Promise!es6-promise',
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('[hash].min.css', { allChunks: true }),
      function () {
        this.plugin('done', function (stats) {
          renderPages(stats.hash)
          renderShareImageTemplate(stats.hash)
        })
      }
    ]
  }
)
