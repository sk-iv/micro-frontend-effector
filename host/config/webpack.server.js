const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(shared, {
  name: "server",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "../server/index.js")],
  mode: "development",
  plugins: [
    ...moduleFederationPlugin.server,
  ],
  stats: {
    colors: true,
  },
});