const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  filename: "popup.html",
  template: "popup.html"
});
const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: "manifest.json", to: "manifest.json" },
    { from: "icon.png", to: "icon.png" }
  ]
});
const extractCss = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

module.exports = {
  entry: {
    popup: "./popup.js",
    background: "./background.js"
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map",
  plugins: [htmlPlugin, copyPlugin, extractCss],
  optimization: {
    minimize: true
  }
};
