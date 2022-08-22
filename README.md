# Module federation workshop

 ### Configuring remote
     
 ```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,// port on which the application wiil run
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote", // site name 
      library: { type: "var", name: "remote" },
      filename: "remoteEntry.js", // remote entry point
      exposes: {
        "./Button": "./src/Button", // shared components
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};


```

### Configuring host

```javascript

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote: `remote@http://localhost:3001/remoteEntry.js`, // remote from where we consume the javascript modules
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```

### Importing the component ###
```javascript 
//import using React.lazy()

const Button = React.lazy(() => import("remote/Button"));

```

### Using the component ###
```javascript
// Load the button using <React.Suspense/>
const App = () => (
    ...
    <React.Suspense fallback={<div>"Loading Button"</div>}>
      <Button text={"Text for host button"} backgroundColor="limegreen" color="white"/>
    </React.Suspense>
  ...
);
```

 ### Workshop tasks: ###

 Note: Don´t stress out, just do what you can achieve from the tasks below using the time you have, and if you get stuck, you'll be given instructions to download the corresponding solution, or take a look into the official [webpack module federation examples repo](https://github.com/module-federation/module-federation-examples), or into the official [webpack module federation documentation](https://webpack.js.org/concepts/module-federation/).

 1. Grab the content from the master branch in the repo and move to the`bootstrap` folder. In the console run `npm install` for both `remote` and `host`. 

 In your browser open both:
 - [localhost:3001](http://localhost:3001/) (REMOTE)
 - [localhost:3002](http://localhost:3002/) (HOST)

 If you want to start from scratch:
 
      a)  Make sure you have `npx` installed in node. 
  
      b)  In today's workshop we will be using react and javascript.
  
      c) Use the comand `npx create-mf-app` to create 2 new sites: `remote` running on port :3001 and `host` running on port :3002. 

 2. Use the webpack configuration example above to configure `webpack.config.json` file for both the remote and the host and run `npm start` in the terminal for both projects.

 3. In the `remote` running on port :3001 Create a button component that receives color and text and expose it from the `remote` running on port :3001 and import it into the `host` running on port :3002.

 4. Use persons.js array as data source and the persons image directory from the repo, import them into the remote grab the carousel component (Note: you'll need to install [Semantic UI React](https://react.semantic-ui.com/usage) `npm install semantic-ui-react semantic-ui-css` ) and place it into the `remote` running on port :3001. 

 5. Configure `webpack.config.json` to expose the carousel component.

 6. In the `host` running on port :3002 configure `webpack.config.json` to import the carousel.

 7. Create a third  module federation site named `hybrid` using the comand `npx create-mf-app` or duplicating some of the others sites and configure `webpack.config.json` to run this site on port :3003.

 8. In the `hybrid` site running on port :3003 import the data source from the `remote` site running on port :3001 and create a filter component to perform searches using that same data source.

 9. Import the carousel into the the `hybrid` site running on port :3003.

 10. Configure the `hybrid` site running on port :3003 as a remote to expose the filter component.

 11. In the `host` site running on port :3002 configure the `hybrid` site running on port :3003 as a remote.

 12. In the `host` site running on port :3002, import the filter module from the `hybrid` site running on port :3003