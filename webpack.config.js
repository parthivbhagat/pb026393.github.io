var webpack = require( "webpack" );
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "starter_app": ['./webpack.entry.js']
  },
  output: {
    filename: './js/[name].js',
    path: "./dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src|index\.js/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  devtool: "sourcemap",
  debug: true,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("./css/[name].css")
  ]
};
