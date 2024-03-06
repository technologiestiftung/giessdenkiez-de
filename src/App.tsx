import React from "react";
import Map from "./components/map/map";
import Router from "./components/router/router";

const App: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="col-start-1 row-start-1 h-full w-full">
          <Map />
        </div>
        <div className="pointer-events-none z-[1000] col-start-1 row-start-1 h-full w-full">
          <Router />
        </div>
      </div>
    </>
  );
};

export default App;
