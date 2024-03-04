import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export function useMapSetup(
  mapContainer: React.MutableRefObject<HTMLDivElement | null>,
  map: React.MutableRefObject<mapboxgl.Map | null>,
) {
  useEffect(() => {
    if (map.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: import.meta.env.VITE_MAPBOX_STYLE_URL,
      center: [13.4, 52.52],
      zoom: 15,
    });

    map.current.on("load", () => {
      map.current!.addSource("trees", {
        type: "vector",
        url: import.meta.env.VITE_MAPBOX_TREES_TILESET_URL,
        promoteId: "id",
      });

      map.current!.addLayer({
        id: "trees",
        type: "circle",
        source: "trees",
        "source-layer": import.meta.env.VITE_MAPBOX_TREES_TILESET_LAYER,
        interactive: true,
        paint: {
          "circle-pitch-alignment": "map",
          "circle-radius": 2,
          "circle-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            20,
            0.5,
          ],
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "select"], false],
            "rgba(247, 105, 6, 1)",
            "rgb(12,101,81)",
          ],
          "circle-color": "rgb(12,101,81)",
          "circle-stroke-width": [
            "case",
            ["boolean", ["feature-state", "select"], false],
            15,
            0,
          ],
        },
      });
    });
  });
}
