// const webpack = require("webpack");
// const path = require("path");
// const Dotenv = require("dotenv-webpack");

// module.exports = {
//   mode: "development",
//   entry: "./frontend/src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   plugins: [
//     new Dotenv(),
//     new webpack.DefinePlugin({
//       "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
//     }),
//   ],
// };
