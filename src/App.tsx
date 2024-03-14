import React from "react";
import Map from "./components/map/map";
import Router from "./components/router/router";
import { useAuthStore } from "./auth/auth-store.tsx";

const App: React.FC = () => {
  useAuthStore();

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
