import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import { useMapSetup } from "./hooks/use-map-setup";
import LocationSearch from "../location-search/location-search";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useMapSetup(mapContainer, map);

  return (
    <div className="grid grid-cols-1">
      <div ref={mapContainer} className="col-start-1 row-start-1 h-screen" />
      <div className="z-[1000] col-start-1 row-start-1 mt-2 flex h-fit w-full justify-center">
        <LocationSearch onGeocodedResultChoice={() => {}}></LocationSearch>
      </div>
    </div>
  );
};

export default Map;
