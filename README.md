# Module federation workshop

In this workshop exercise we will try to demonstrate how to use webpack 5 module federation plugin to export/import different MFE (Micro Front End) applications and javascript modules throughout different sites, and some of the different architectural options derived from MFE utilisation.

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

 Note: Don´t stress out, just do what you can achieve from the tasks below using the time you have. If you get stuck just ask, you'll be given instructions to help you moving forward, or you can take a look into the official [webpack module federation examples repo](https://github.com/module-federation/module-federation-examples), or into the official [webpack module federation documentation](https://webpack.js.org/concepts/module-federation/).

 1. Grab the content from the master branch in the repo and move to the`bootstrap` folder. In the console run `npm install` both `remote` and `host` folders. 

 In your browser open both:
 - [localhost:3001](http://localhost:3001/) (REMOTE)
 - [localhost:3002](http://localhost:3002/) (HOST)

 If you want to start from scratch:
 
      a)  Make sure you have `npx` installed in node. 
  
      b)  In today's workshop we will be using react and javascript.
  
      c) Use the comand `npx create-mf-app` to create 2 new sites: `remote` running on port :3001 and `host` running on port :3002. 

 2. Use the webpack configuration example above to configure `webpack.config.json` file for both the remote and the host and run `npm start` in the terminal for both projects.

 3. In the `remote` running on port :3001 Create a button component that receives color and text and expose it from the `remote` running on port :3001 and import it into the `host` running on port :3002.

 4. Use persons.js array as data source and the persons image directory from the repo, import them into the `remote` running on port :3001. 

 5. Configure `webpack.config.json` to expose the `Button` component and `persons.js`.

 6. In the `host` running on port :3002 configure `webpack.config.json` to import the `Button` component, import it and show in the page.

 7. Create a third  module federation site named `hybrid` duplicating some of the other sites or using the comand `npx create-mf-app` and configure `webpack.config.json` to run this site on port :3003. 

 8. Configure the `remote` site running on port :3001 as a remote in the `hybrid` site running on port :3003.

 9. Import the `Button` component in the `hybrid` site running on port :3003, show in the page. 

 10. Grab the `Carousel` and `PersonCard` component from the components folder (Note: you'll need to install [Semantic UI React](https://react.semantic-ui.com/usage) `npm install semantic-ui-react semantic-ui-css`). 
 Show the components in the `hybrid` site running on port :3003.

 11. In the `hybrid` site running on port :3003 import the data source from the `remote` site running on port :3001 and grab the `PersonFilter` component from the components folder to perform searches using that same data source. Show the `PersonFilter` in the `hybrid` site and configure `webpack.config.json` to expose the `PersonFilter` component.

 12. In the `host` site running on port :3002 configure the `hybrid` site running on port :3003 as a remote.

 13. In the `host` site running on port :3002, import the `PersonFilter` component from the `hybrid` site running on port :3003 and show it in the page