import React from "react";
const RemoteButton = React.lazy(() => import("remote/Button"));
import Carousel from "./Carousel";
import PersonFilter from "./PersonFilter";

const App = () => {
  return(
  <div style={{maxWidth: "1300px",margin:"0 auto"}}>
    <h1>Hybrid</h1>
    <h2>Button component consumed here and TextBox, carousel and filter components exposed from here</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text={"Text for hybrid button"} backgroundColor="blue" color="white"/>
      <h2>Filter</h2>
      <PersonFilter/>
      <h2>Carousel</h2>
      <Carousel/>
    </React.Suspense>
  </div>
)};

export default App;
