import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { Pump, useHoveredPump } from "./use-hovered-pump";

export function useMapPumpsInteraction(map: mapboxgl.Map | undefined) {
	const { hoveredPump, setHoveredPump, mapboxFeatureToPump } = useHoveredPump();

	const isPumpsVisible = useFilterStore((store) => store.isPumpsVisible);

	const hoveredPumpRef = useRef<Pump | undefined>();
	useEffect(() => {
		hoveredPumpRef.current = hoveredPump;
	}, [hoveredPump]);

	useEffect(() => {
		if (!map) {
			return;
		}
		if (map.isStyleLoaded()) {
			map.setLayoutProperty(
				"pumps",
				"visibility",
				isPumpsVisible ? "visible" : "none",
			);
		}
	}, [map, isPumpsVisible]);

	useEffect(() => {
		if (!map) {
			return;
		}

		map.on("mousemove", "pumps", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setHoveredPump(undefined);
			}

			const pumpFeature = e.features[0];
			const pump = mapboxFeatureToPump(map, pumpFeature, e);
			if (!pump) {
				return;
			}

			setHoveredPump(pump);

			map.setFilter("pumps-highlight", ["==", "id", pump.id]);

			map.getCanvas().style.cursor = "pointer";
			if (hoveredPumpRef.current && pump.id !== hoveredPumpRef.current.id) {
				map.setFilter("pumps-highlight", [
					"==",
					"id",
					hoveredPumpRef.current.id,
				]);
			}
		});

		map.on("mouseleave", "pumps", () => {
			if (map && hoveredPumpRef.current) {
				map.setFilter("pumps-highlight", ["==", "id", ""]);
				map.getCanvas().style.cursor = "";
			}
			setHoveredPump(undefined);
		});
	}, [map]);
}
