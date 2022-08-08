import React from "react";

const RemoteButton = React.lazy(() => import("remote/Button"));

const App = () => (
  <div>
    <h1>Host</h1>
    <h2>Button component consumed from here</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text={"Text for host button"} backgroundColor="limegreen" color="white"/>
    </React.Suspense>
  </div>
);

export default App;
