// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // webpack starts reading here
  output: {
    path: path.resolve(__dirname, "dist"), // bundles go here
    filename: "bundle.js",
    clean: true, // clears dist/ on each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // uses your HTML as a template
    }),
  ],
  devServer: {
    static: "./dist",
    open: true, // opens browser automatically
  },
  mode: "development",
};
