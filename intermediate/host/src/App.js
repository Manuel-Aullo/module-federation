import React from "react";

const RemoteButton = React.lazy(() => import("remote/Button"));
const HybridTextBox = React.lazy(() => import("hybrid/TextBox"));
const HybridCarousel = React.lazy(() => import("hybrid/Carousel"));

const App = () => (
  <div>
    <h1>Host</h1>
    <h2>Button component consumed from here</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text={"Text for host button"} backgroundColor="limegreen" color="white"/>
      <HybridTextBox placeholder={"Hola!!!"}/>
      <HybridCarousel/>
    </React.Suspense>
  </div>
);

export default App;
