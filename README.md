# Module federation example

This example demos a basic host application loading a remote component.

- `host` is the host application Javascript Module consumer.
- `remote` remote app which exposes `Button` component Javascript Module.

### Running Demo

 Go into each folder and run npm install this will run the host on port 3001 and the remote on port 3002

 In your browser open both:
 - [localhost:3001](http://localhost:3001/) (REMOTE)
 - [localhost:3002](http://localhost:3002/) (HOST)

 ### Configuring remote
     
 ```javascript
module.exports = {
...
  devServer: {
    ...
    port: 3001, // Port on which the app will run
  },
  ...
  module: {
    rules: [
      ...
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote", // Site name identifier
      library: { type: "var", name: "remote" },
      filename: "remoteEntry.js", // Entry point for the exposed code 
      exposes: {
        "./Button": "./src/Button", // The exposed javascript module
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }, // Shared libraries
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```

### Configuring host

```javascript

module.exports = {
  ...
  devServer: {
    ...
    port: 3002, // The port on which the remote will be opened
  },
  module: {
    rules: [
      ...
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host", //Site name
      remotes: {
        remote: `remote@http://localhost:3001/remoteEntry.js`, // Remote entry point
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```
### Starting from scratch: ###

 1. Make sure you have `npx` installed in node.

 2. Go to the console and type `npx create-mf-app`.

 3. You will be asked several questions to setup your project.

 4. Pick the ones of your choice and let's begin.

 ### Workshop tasks: ###

 Note: Don´t stress out, just do what you can achieve from the tasks below using the time you have, and if you get stuck, take a look into the example from this repo or into the official [webpack module federation examples repo](https://github.com/module-federation/module-federation-examples), or take a look into the official [webpack module federation documentation](https://webpack.js.org/concepts/module-federation/).

 1. Using the comand `npx create-mf-app` create 2 new sites: `remote` running on port :3001 and `host` running on port :3002

 2. Use the example above to configure `webpack.config.json` file for remote and host.

 3. In the `remote` running on port :3001 Create a button component that receives color, text and an `onClick` method to `console.log()` some text and expose it from the `remote` running on port :3001 and import it into the `host` running on port :3002.

 4. Use persons.js array as data source and the persons image directory from the repo create a carousel component in the `remote` running on port :3001. 

 5. Configure `webpack.config.json` to expose the carousel component.

 6. In the `host` running on port :3002 import the carousel.

 7. Create a third  module federation site named `hybrid` using the comand `npx create-mf-app` and configure `webpack.config.json` to run this site on port :3003.

 8. In the `hybrid` site running on port :3003 import the data source from the `remote` site running on port :3001 and create a filter component to perform searches using that same data source.

 9. Import the carousel into the the `hybrid` site running on port :3003.

 10. Configure the `hybrid` site running on port :3003 as a remote to expose the filter component.

 11. In the `host` site running on port :3002 configure the `hybrid` site running on port :3003 as a remote.

 12. In the `host` site running on port :3002, import the search module from the `hybrid` site running on port :3003

 13. Create fallbacks for the imported modules to have an error handling in place whenerver the modules are not available. 
