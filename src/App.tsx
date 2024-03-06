import React from "react";
import Map from "./components/map/map";
import Router from "./components/router/router";
import LocationSearch from "./components/location-search/location-search";

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
      <div className="z-[1000] flex flex-col items-center justify-center bg-red-100">
        <LocationSearch onGeocodedResultChoice={() => {}}></LocationSearch>
      </div>
      <Map />
    </>
  );
};

export default App;
