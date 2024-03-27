import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useTreeStore } from "../../tree-detail/tree-store";

export function useHoveredTree(map: mapboxgl.Map | undefined) {
	const [hoveredTreeId, setHoveredTreeId] = useTreeStore((store) => [
		store.hoveredTreeId,
		store.setHoveredTreeId,
	]);

	const hoveredTreeIdRef = useRef<string | undefined>(undefined);
	useEffect(() => {
		if (!map) {
			return;
		}

		if (hoveredTreeId) {
			map.setFeatureState(
				{
					id: hoveredTreeId,
					source: "trees",
					sourceLayer: "trees",
				},
				{ hover: true },
			);
		}

		if (hoveredTreeIdRef.current) {
			map.setFeatureState(
				{
					id: hoveredTreeIdRef.current,
					source: "trees",
					sourceLayer: "trees",
				},
				{ hover: false },
			);
		}

		hoveredTreeIdRef.current = hoveredTreeId;
	}, [hoveredTreeId]);

	return { hoveredTreeIdRef, setHoveredTreeId };
}
