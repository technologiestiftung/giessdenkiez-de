import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { Pump, useHoveredPump } from "./use-hovered-pump";
import { useSelectedPump } from "./use-selected-pump";
import { useMapConstants } from "./use-map-constants";

export function useMapPumpsInteraction(map: mapboxgl.Map | undefined) {
	const { MAP_MAX_ZOOM_LEVEL } = useMapConstants();

	const { hoveredPump, setHoveredPump, mapboxFeatureToPump } = useHoveredPump();
	const hoveredPumpRef = useRef<Pump | undefined>();
	useEffect(() => {
		hoveredPumpRef.current = hoveredPump;
	}, [hoveredPump]);

	const { selectedPump, setSelectedPump } = useSelectedPump();
	const selectectedPumpRef = useRef<Pump | undefined>();
	useEffect(() => {
		selectectedPumpRef.current = selectedPump;
	}, [selectedPump]);

	const flying = useRef(false);

	const isPumpsVisible = useFilterStore((store) => store.isPumpsVisible);

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
			map.setLayoutProperty(
				"pumps-highlight",
				"visibility",
				isPumpsVisible ? "visible" : "none",
			);
		}
		if (!isPumpsVisible) {
			setHoveredPump(undefined);
			setSelectedPump(undefined);
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
			const pump = mapboxFeatureToPump(map, pumpFeature);
			if (!pump) {
				return;
			}

			setHoveredPump(pump);
			setSelectedPump(undefined);
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

		map.on("click", "pumps", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setSelectedPump(undefined);
			}
			const pumpFeature = e.features[0];
			const pump = mapboxFeatureToPump(map, pumpFeature);
			if (!pump) {
				return;
			}

			setHoveredPump(undefined);

			map.easeTo({
				center: [
					//@ts-expect-error no types for geometry.coordinates
					pumpFeature.geometry.coordinates[0],
					//@ts-expect-error no types for geometry.coordinates
					pumpFeature.geometry.coordinates[1],
				],
				zoom: MAP_MAX_ZOOM_LEVEL,
				essential: true,
			});

			flying.current = true;

			map.on("move", function () {
				if (flying.current) {
					const newPump = mapboxFeatureToPump(map, pumpFeature);
					if (!newPump) {
						return;
					}
					setSelectedPump(newPump);
					map.setFilter("pumps-highlight", ["==", "id", newPump.id]);
				}
			});

			map.on("flyend", function () {
				flying.current = false;
				const newPump = mapboxFeatureToPump(map, pumpFeature);
				if (!newPump) {
					return;
				}
				setSelectedPump(newPump);
				map.setFilter("pumps-highlight", ["==", "id", newPump.id]);
			});

			map.on("moveend", function () {
				if (flying.current) {
					map.fire("flyend");
				}
			});
		});

		map.on("movestart", function () {
			if (map.getLayer("pumps-highlight") && !flying.current) {
				setSelectedPump(undefined);
				setHoveredPump(undefined);
				map.setFilter("pumps-highlight", ["==", "id", ""]);
			}
		});
	}, [map]);
}
