import React from "react";
const RemoteButton = React.lazy(() => import("remote/Button"));
import Carousel from "./Carousel";

const App = () => {
  return(
  <div>
    <h1>Hybrid</h1>
    <h2>Button component consumed here and TextBox, carousel and searcch components exposed from here</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text={"Text for hybrid button"} backgroundColor="blue" color="white"/>
      <Carousel/>
    </React.Suspense>
  </div>
)};

export default App;
