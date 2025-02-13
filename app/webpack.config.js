const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js",

  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "sass-loader",  
          options: {
            sassOptions: {
              // quietDeps: true,
              includePaths: [path.resolve(__dirname, "node_modules")],
            },
          },
        },],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|png|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index", "main"],
      filename: "index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 9000,
  },
};
