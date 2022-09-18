const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(shared, {
  name: "client",
  target: "web",
  devServer: {
    port: 9090,
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")],
  mode: "development",
  plugins: [
    moduleFederationPlugin.client,
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});