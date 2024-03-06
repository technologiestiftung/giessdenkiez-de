import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import { useMapSetup } from "./hooks/use-map-setup";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useMapSetup(mapContainer, map);

  return (
    <>
      <div ref={mapContainer} className="h-screen" />
    </>
  );
};

export default Map;
