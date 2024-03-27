/* eslint-disable max-lines */
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { useTreeStore } from "../../tree-detail/tree-store";
import { useHoveredTree } from "./use-hovered-tree";
import { useMapConstants } from "./use-map-constants";
import { useSelectedTree } from "./use-selected-tree";
import { useTreeCircleStyle } from "./use-tree-circle-style";
import { useSearchStore } from "../../location-search/search-store";
import { usePumpStore } from "./use-pump-store";

export function useMapTreesInteraction(map: mapboxgl.Map | undefined) {
	const { hideFilterView } = useFilterStore();

	const { MAP_MAX_ZOOM_LEVEL } = useMapConstants();

	const { setHoveredTreeId } = useHoveredTree(map);
	const { setSelectedTreeId } = useSelectedTree(map);

	const { treeData } = useTreeStore();

	const { treeAgeIntervals, lat, lng, zoom, setLat, setLng, setZoom } =
		useFilterStore();

	const { filteredCircleColor } = useTreeCircleStyle();

	const { clearSearch } = useSearchStore();
	const { setHoveredPump, setSelectedPump } = usePumpStore();

	useEffect(() => {
		if (!map) {
			return;
		}
		if (map.isStyleLoaded()) {
			map.setPaintProperty(
				"trees",
				"circle-color",
				filteredCircleColor(treeAgeIntervals),
			);
			return;
		}
		map.on("load", () => {
			map.setPaintProperty(
				"trees",
				"circle-color",
				filteredCircleColor(treeAgeIntervals),
			);
		});
	}, [map, treeAgeIntervals]);

	useEffect(() => {
		if (treeData) {
			if (map?.loaded()) {
				clearSearch();
				setSelectedTreeId(treeData.id);
				map.easeTo({
					center: [parseFloat(treeData.lat), parseFloat(treeData.lng)],
					zoom: MAP_MAX_ZOOM_LEVEL,
					essential: true,
				});
				return;
			}
			map?.on("load", () => {
				setSelectedTreeId(treeData.id);
				map.easeTo({
					center: [parseFloat(treeData.lat), parseFloat(treeData.lng)],
					zoom: MAP_MAX_ZOOM_LEVEL,
					essential: true,
				});
			});
			return;
		}
		setSelectedTreeId(undefined);
	}, [treeData, map]);

	useEffect(() => {
		if (!map) {
			return;
		}
		if (map.isStyleLoaded()) {
			map.setCenter([lng, lat]);
			map.setZoom(zoom);
			return;
		}
		map.on("load", () => {
			map.setCenter([lng, lat]);
			map.setZoom(zoom);
		});
	}, [map, lat, lng, zoom]);

	useEffect(() => {
		if (!map) {
			return;
		}

		map.on("zoomend", () => {
			setZoom(map.getZoom());
		});

		map.on("moveend", () => {
			setLat(map.getCenter().lat);
			setLng(map.getCenter().lng);
		});

		map.on("mousemove", "trees", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setHoveredTreeId(undefined);
			}
			const treeFeature = e.features[0];
			setHoveredTreeId(treeFeature.id as string);
			map.getCanvas().style.cursor = "pointer";
		});

		map.on("click", "trees", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setHoveredTreeId(undefined);
			}
			const treeFeature = e.features[0];

			setSelectedPump(undefined);
			setHoveredPump(undefined);
			hideFilterView();

			setSelectedTreeId(treeFeature.id as string);

			map.easeTo({
				center: [
					//@ts-expect-error no types for geometry.coordinates
					treeFeature.geometry.coordinates[0],
					//@ts-expect-error no types for geometry.coordinates
					treeFeature.geometry.coordinates[1],
				],
				zoom: MAP_MAX_ZOOM_LEVEL,
				essential: true,
			});
		});

		map.on("mouseleave", "trees", () => {
			map.getCanvas().style.cursor = "";
			setHoveredTreeId(undefined);
		});
	}, [map]);
}
