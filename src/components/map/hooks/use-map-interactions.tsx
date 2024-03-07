import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useUrlState } from "../../router/store";

export function useMapInteraction(map: mapboxgl.Map | undefined) {
  const setSearchParams = useUrlState((state) => state.setSearchParams);

  const [hoveredTreeId, setHoveredTreeId] = useState<string | undefined>(
    undefined,
  );
  const hoveredTreeIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    hoveredTreeIdRef.current = hoveredTreeId;
  }, [hoveredTreeId]);

  const [selectedTreeId, setSelectedTreeId] = useState<string | undefined>(
    undefined,
  );
  const selectedTreeIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    selectedTreeIdRef.current = selectedTreeId;
  }, [selectedTreeId]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("mousemove", "trees", (e) => {
      if (!map || !e.features) return;
      if (e.features?.length === 0) setHoveredTreeId(undefined);
      const treeFeature = e.features[0];
      setHoveredTreeId(treeFeature.id as string);
      map.setFeatureState(treeFeature, { hover: true });
      map.getCanvas().style.cursor = "pointer";
      if (
        hoveredTreeIdRef.current &&
        treeFeature.id !== hoveredTreeIdRef.current
      ) {
        map.setFeatureState(
          {
            id: hoveredTreeIdRef.current,
            source: "trees",
            sourceLayer: "trees",
          },
          { hover: false },
        );
      }
    });

    map.on("click", "trees", (e) => {
      if (!map || !e.features) return;
      if (e.features?.length === 0) setHoveredTreeId(undefined);
      const treeFeature = e.features[0];
      setSearchParams(
        new URLSearchParams({ treeId: treeFeature.id as string }),
      );
      if (selectedTreeIdRef.current) {
        map.setFeatureState(
          {
            id: selectedTreeIdRef.current,
            source: "trees",
            sourceLayer: "trees",
          },
          { select: false },
        );
      }
      map.setFeatureState(
        {
          id: treeFeature.id as string,
          source: "trees",
          sourceLayer: "trees",
        },
        { select: true },
      );
      setSelectedTreeId(treeFeature.id as string);
      map.easeTo({
        center: [
          treeFeature.geometry.coordinates[0],
          treeFeature.geometry.coordinates[1],
        ],
        essential: true,
      });
    });

    map.on("mouseleave", "trees", (_) => {
      if (map && hoveredTreeIdRef.current) {
        map.setFeatureState(
          {
            id: hoveredTreeIdRef.current,
            source: "trees",
            sourceLayer: "trees",
          },
          { hover: false },
        );
        map.getCanvas().style.cursor = "";
      }
      setHoveredTreeId(undefined);
    });
  }, [map]);
}
