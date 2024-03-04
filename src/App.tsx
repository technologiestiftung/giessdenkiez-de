import React from "react";
import Map from "./components/map/map";
import Router from "./components/router/router";

const App: React.FC = () => {
  return (
    <>
      <Router />
      <Map />
    </>
  );
};

export default App;
