const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'popup.html',
  template: 'popup.html',
});
const copyPlugin = new CopyWebpackPlugin([
  { from: 'manifest.json', to: 'manifest.json' },
  { from: 'nav-star.png', to: 'nav-star.png' },
]);
const extractCss = new ExtractTextPlugin({
  filename: './styles.css',
  allChunks: true,
});

module.exports = {
  entry: './popup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  plugins: [
    htmlPlugin,
    copyPlugin,
    extractCss,
  ],
};
