import React from "react";
import Map from "./components/map/map";
import { useTrackPageView } from "./components/matomo/hooks/use-track-page-view";

const App: React.FC = () => {
  useTrackPageView();

  return (
    <>
      <Map />
    </>
  );
};

export default App;
