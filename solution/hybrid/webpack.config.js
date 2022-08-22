const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "hybrid",
      filename: "remoteEntry.js",
      exposes: {
        "./TextBox": "./src/TextBox.js",
        "./Carousel": "./src/Carousel.js",
        "./PersonFilter": "./src/PersonFilter.js"        
      },
      remotes: {
        remote: `remote@http://localhost:3001/remoteEntry.js`
      },
      shared: { "semantic-ui-css/semantic.min.css":{ singleton: true }, react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
