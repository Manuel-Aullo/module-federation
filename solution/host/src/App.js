import React from "react";

const RemoteButton = React.lazy(() => import("remote/Button"));
const HybridTextBox = React.lazy(() => import("hybrid/TextBox"));
const HybridCarousel = React.lazy(() => import("hybrid/Carousel"));
const HybridPersonFilter = React.lazy(()=> import ("hybrid/PersonFilter"))

const App = () => (
  <div style={{maxWidth: "1300px",margin:"0 auto"}}>
    <h1>Host</h1>
    <h2>Button component consumed from here</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text={"Text for host button"} backgroundColor="limegreen" color="white"/>
      <HybridTextBox placeholder={"Hola!!!"}/>
      <h2>Carousel from hybrid</h2>
      <HybridCarousel/>
      <h2>Filter from hybrid</h2>
      <HybridPersonFilter/>
    </React.Suspense>
  </div>
);

export default App;
