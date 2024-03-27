/* eslint-disable max-lines */
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { useSelectedPump } from "./use-selected-pump";
import { useMapConstants } from "./use-map-constants";
import { useHoveredTree } from "./use-hovered-tree";
import { useSelectedTree } from "./use-selected-tree";
import { usePumpStore } from "./use-pump-store";
import { useHoveredPump } from "./use-hovered-pump";

export function useMapPumpsInteraction(map: mapboxgl.Map | undefined) {
	const { MAP_MAX_ZOOM_LEVEL } = useMapConstants();

	const { mapboxFeatureToPump, updatePumpPosition } = usePumpStore();

	const { setSelectedPump, selectedPumpRef } = useSelectedPump(map);
	const { setHoveredPump } = useHoveredPump(map);

	const flying = useRef(false);

	const isPumpsVisible = useFilterStore((store) => store.isPumpsVisible);

	const { setHoveredTreeId } = useHoveredTree(map);
	const { setSelectedTreeId } = useSelectedTree(map);

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
			if (selectedPumpRef.current) {
				return;
			}

			const pumpFeature = e.features[0];
			const pump = mapboxFeatureToPump(map, pumpFeature);
			if (!pump) {
				return;
			}

			setHoveredPump(pump);
			setSelectedPump(undefined);
		});

		map.on("mouseleave", "pumps", () => {
			setHoveredPump(undefined);
		});

		map.on("click", "pumps", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setSelectedPump(undefined);
			}
			setSelectedTreeId(undefined);
			setHoveredTreeId(undefined);

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
				}
			});

			map.on("flyend", function () {
				flying.current = false;
				const newPump = mapboxFeatureToPump(map, pumpFeature);
				if (!newPump) {
					return;
				}
				setSelectedPump(newPump);
			});

			map.on("moveend", function () {
				if (flying.current) {
					map.fire("flyend");
				}
			});
		});

		map.on("dragstart", function () {
			if (map.getLayer("pumps-highlight") && !flying.current) {
				setSelectedPump(undefined);
				setHoveredPump(undefined);
			}
		});

		map.on("zoom", function () {
			if (
				map.getLayer("pumps-highlight") &&
				!flying.current &&
				selectedPumpRef.current
			) {
				const newPump = updatePumpPosition(map, selectedPumpRef.current);
				if (!newPump) {
					return;
				}
				setSelectedPump(newPump);
			}
		});
	}, [map]);
}
