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

### Alternativelly you can also start from scratch:

 1. Go to the console and type `npx create-mf-app`.

 2. You will be asked several questions to setup your project.

 3. Pick the ones of your choice and let's begin.

 ### Workshop tasks:

 Note: Don´t stress out, just do what you can achieve from the tasks below using the time you have, and if you get stuck, take a look into the example or into the official [webpack module federation examples repo](https://github.com/module-federation/module-federation-examples).

 1. Configure `webpack.config.json` file for remote and host.

 2. Create a component and expose it from the remote and import it in the host.

 3. Use persons.js array as data source and the persons image directory from the repo in the remote and expose them.

 4. Using that data source create a carousel component in the remote and expose it.

 5. In the host runing on port :3002 import the carousel.

 6. Create a third  module federation site using the comand `npx create-mf-app` and configure webpack to run this site on port :3003 to consume data from the remote runing on port :3001.

 7. Import the data source from the remote and create a filter component to perform searches using that same data source.

 8. Import the carousel.

 9. Configure the third site runing on port :3003 as a remote to expose the filter module.

 10. On the site runing on port :3002, import the search module from the new remote site runing on port :3003

 11. Create fallbacks for the imported modules to have an error handling in place whenerver the modules are not available. 

