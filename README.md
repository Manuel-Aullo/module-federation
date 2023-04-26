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
 
 ## Module federation

- [Repo](https://github.com/KnowitJSTSGuild/module-federation)

- [Slides](https://knowit-my.sharepoint.com/:p:/g/personal/manuel_aullo-perez_knowit_fi/EaAloTDwvUFPipBZRSHVJ0oBs9uuApEag9Wh4-zw03RGww?e=Sr0j7W)

- [Documentation](https://webpack.js.org/plugins/module-federation-plugin/#options)

- [Some reading](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669)

- [Module federation examples repo](https://github.com/module-federation/module-federation-examples)

- [Micro front ends](https://microfrontends.info/microfrontends/)

- [Jack Herrington Youtube playlist](https://www.youtube.com/watch?v=432thqUKs-Y&list=PLNqp92_EXZBLr7p7hn6IYa1YPNs4yJ1t1)

**Further reading**

[Practical Module Federation](https://module-federation.myshopify.com/products/practical-module-federation)

[Micro Frontends](https://micro-frontends.org/)

[Full Site Federation in Webpack 5](https://www.jackherrington.com/full-site-federation-in-webpack-5/)

[Adopting a Micro-frontends architecture](https://medium.com/dazn-tech/adopting-a-micro-frontends-architecture-e283e6a3c4f3)

[Micro Frontends From Beginner to Expert](https://www.linkedin.com/pulse/micro-frontends-from-begining-expert-rany-elhousieny-phd%E1%B4%AC%E1%B4%AE%E1%B4%B0)

[Micro Frontends What, Why, and How](https://www.linkedin.com/pulse/micro-frontends-what-why-how-rany-elhousieny-phd%E1%B4%AC%E1%B4%AE%E1%B4%B0/)

[Understanding Micro Frontends With a Hands-On Example Using React, Webpack 5, and Module Federation](https://medium.com/nerd-for-tech/micro-front-ends-hands-on-project-63bd3327e162)

[Micro Frontends Hands-On Example Using React, Webpack 5, and Module Federation: Adding a third React Micro Frontend](https://medium.com/nerd-for-tech/micro-frontends-hands-on-example-using-react-webpack-5-and-module-federation-adding-a-third-2fe8c61a73f)

[Deploying Micro Frontends to AWS Step by Step Using React, Webpack 5, and Module Federation](https://www.linkedin.com/pulse/deploying-micro-frontends-aws-step-using-gitlab-react-rany)

[Understanding Micro-Frontends Webpack5 configurations Step by Step](https://www.linkedin.com/pulse/understanding-micro-frontends-webpack5-configurations-rany)

[Understanding Micro-Frontends Webpack5 Module Federation configurations Step by Step](https://www.linkedin.com/pulse/understanding-micro-frontends-webpack5-module-step-rany)

[Micro Frontends by Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)

[11 Micro Frontends Frameworks You Should Know](https://itnext.io/11-micro-frontends-frameworks-you-should-know-b66913b9cd20)

[Micro-frontends decisions framework](https://medium.com/@lucamezzalira/micro-frontends-decisions-framework-ebcd22256513)

[Why Frontend Developers Need to be Webpack Experts](https://blog.bitsrc.io/why-frontend-developers-need-to-be-webpack-experts-32e734b6f04a)

[Micro-Frontends at scale (part 1)](https://medium.com/xgeeks/micro-frontends-at-scale-part-1-a8ab67bfb773)

[Frontend Architectural Patterns: Backends-For-Frontends](https://medium.com/frontend-at-scale/frontend-architectural-patterns-backend-for-frontend-29679aba886c)
 
