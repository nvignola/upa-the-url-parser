const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './popup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: __dirname,
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  plugins: [
    new (HtmlWebpackPlugin)({
      filename: 'popup.html',
      template: 'popup.html',
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json', to: 'manifest.json' },
      { from: 'nav-star.png', to: 'nav-star.png' },
      { from: 'styles.css', to: 'styles.css' },
    ]),
  ],
};
