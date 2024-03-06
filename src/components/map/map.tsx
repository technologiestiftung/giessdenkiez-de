import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { useMapSetup } from "./hooks/use-map-setup";
import { useMapStore } from "./map-store";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { setMap } = useMapStore();

  useMapSetup(mapContainer, map);

  useEffect(() => {
    if (map && map.current) {
      setMap(map.current);
    }
  }, [map]);

  return <div ref={mapContainer} className="h-screen" />;
};

export default Map;
