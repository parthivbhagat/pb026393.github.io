var webpack = require( "webpack" );
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: { 'starter_app': [
    './webpack.entry.js'
  ]},
  output: {
    filename: './js/[name].js',
    path: "./dist"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(path.join(__dirname, 'src'))
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("./css/[name].css")
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  }
};