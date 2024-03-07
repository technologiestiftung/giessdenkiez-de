import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useMapStore } from "../map-store";
import { useMapInteraction } from "./use-map-interaction";
import { useCirclePaint } from "./use-circle-paint";

export function useMapSetup(
  mapContainer: React.MutableRefObject<HTMLDivElement | null>,
) {
  const { map, setMap } = useMapStore();
  useMapInteraction(map);

  const {
    circleRadius,
    circleOpacity,
    circleStrokeColor,
    circleColor,
    circleStrokeWidth,
  } = useCirclePaint();

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: import.meta.env.VITE_MAPBOX_STYLE_URL,
      center: [13.4, 52.52],
      zoom: 15,
    });

    map.on("load", () => {
      map.addSource("trees", {
        type: "vector",
        url: import.meta.env.VITE_MAPBOX_TREES_TILESET_URL,
        promoteId: "id",
      });

      map.addLayer({
        id: "trees",
        type: "circle",
        source: "trees",
        "source-layer": import.meta.env.VITE_MAPBOX_TREES_TILESET_LAYER,
        interactive: true,
        paint: {
          "circle-pitch-alignment": "map",
          "circle-radius": circleRadius,
          "circle-opacity": circleOpacity,
          "circle-stroke-color": circleStrokeColor,
          "circle-color": circleColor,
          "circle-stroke-width": circleStrokeWidth,
        },
      });
    });

    setMap(map);
  }, [mapContainer]);
}
