import * as mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { useSearchStore } from "../../location-search/search-store";
import { useUrlState } from "../../router/store.tsx";
import { useTreeStore } from "../../tree-detail/stores/tree-store";
import { useHoveredTree } from "./use-hovered-tree";
import { useMapConstants } from "./use-map-constants";
import { usePumpStore } from "./use-pump-store";
import { useSelectedTree } from "./use-selected-tree";
import { useTreeCircleStyle } from "./use-tree-circle-style";
import { useTreeAdoptStore } from "../../tree-detail/stores/adopt-tree-store.tsx";

export function useMapTreesInteraction(map: mapboxgl.Map | undefined) {
	const url = useUrlState.getState().url;

	const { hideFilterView } = useFilterStore();

	const { MAP_MAX_ZOOM_LEVEL, mapTreeZoomedInOffset } = useMapConstants();

	const { setHoveredTreeId } = useHoveredTree(map);
	const { setSelectedTreeId } = useSelectedTree(map);

	const { treeCoreData } = useTreeStore();

	const {
		isSomeFilterActive,
		treeAgeRange,
		areOnlyAllAdoptedTreesVisible,
		areLastWateredTreesVisible,
		lat,
		lng,
		zoom,
		setLat,
		setLng,
		setZoom,
	} = useFilterStore();

	const { allAdoptedTrees, getAllAdoptedTrees } = useTreeAdoptStore();

	const { filteredCircleColor } = useTreeCircleStyle();

	const { setHoveredPump, setSelectedPump } = usePumpStore();

	const { clearSearch } = useSearchStore();

	const [easeToStartedByUserClick, setEaseToStartedByUserClick] =
		useState(false);

	useEffect(() => {
		getAllAdoptedTrees();
	}, []);

	useEffect(() => {
		if (!map) {
			return;
		}
		if (map.isStyleLoaded()) {
			map.setPaintProperty(
				"trees",
				"circle-color",
				filteredCircleColor({
					isSomeFilterActive: isSomeFilterActive(),
					areOnlyAllAdoptedTreesVisible,
					areLastWateredTreesVisible,
					treeAgeRange,
					allAdoptedTrees,
				}),
			);
			return;
		}

		map.once("idle", () => {
			map.setPaintProperty(
				"trees",
				"circle-color",
				filteredCircleColor({
					isSomeFilterActive: isSomeFilterActive(),
					areOnlyAllAdoptedTreesVisible,
					areLastWateredTreesVisible,
					treeAgeRange,
					allAdoptedTrees,
				}),
			);
		});
	}, [
		map,
		areOnlyAllAdoptedTreesVisible,
		areLastWateredTreesVisible,
		treeAgeRange,
		allAdoptedTrees,
	]);

	useEffect(() => {
		if (treeCoreData) {
			clearSearch();
			setSelectedTreeId(treeCoreData.id);

			if (easeToStartedByUserClick) {
				return;
			}

			map?.easeTo({
				center: treeCoreData.geom.coordinates,
				zoom: MAP_MAX_ZOOM_LEVEL,
				duration: 1500,
				essential: true,
				offset: mapTreeZoomedInOffset(window.innerWidth),
			});

			return;
		}
	}, [treeCoreData, map]);

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
		if (url.pathname !== "/map") {
			return;
		}
		map.on("zoomend", () => {
			setZoom(map.getZoom());
			setLat(map.getCenter().lat);
			setLng(map.getCenter().lng);
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

			setEaseToStartedByUserClick(true);
			map.easeTo({
				center: [
					//@ts-expect-error no types for geometry.coordinates
					treeFeature.geometry.coordinates[0],
					//@ts-expect-error no types for geometry.coordinates
					treeFeature.geometry.coordinates[1],
				],
				zoom: MAP_MAX_ZOOM_LEVEL,
				essential: true,
				duration: 1500,
				offset: mapTreeZoomedInOffset(window.innerWidth),
			});
			map.once("moveend", () => {
				setEaseToStartedByUserClick(false);
			});
		});

		map.on("mouseleave", "trees", () => {
			map.getCanvas().style.cursor = "";
			setHoveredTreeId(undefined);
		});
	}, [map, url.pathname]);
}
