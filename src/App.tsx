import React from "react";
import Map from "./components/map/map";
import Router from "./components/router/router";

const App: React.FC = () => {
  return (
    <>
      <div
        className={`
        absolute bottom-0 left-0 z-10 h-auto w-screen 
        lg:top-0 lg:h-screen lg:w-auto`}
      >
        <Router />
      </div>
      <Map />
    </>
  );
};

export default App;
