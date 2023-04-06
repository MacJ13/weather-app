const path = require("path");
const MiniCssEctractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/i,
        use: [
          {
            loader: MiniCssEctractPlugin.loader,
            options: { publicPath: "../" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssEctractPlugin({
      filename: "css/style.css",
    }),
  ],
};
